const svg = d3.select("#graph");
const root = svg.append("g");
const $ = id => document.getElementById(id);
const page = $("page");
let width = innerWidth, height = innerHeight;
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const ZOOM_IN_DUR = reduceMotion ? 0 : 900;
const ZOOM_OUT_DUR = reduceMotion ? 0 : 900;
const baseTitle = document.title;

let current = null;      // point dont la page est ouverte
let fromGraph = false;   // ouverte par un clic (donc "retour" = historique)
let animateNext = true;  // animer aussi l'ouverture initiale d'une ancre directe

const degree = {};
data.nodes.forEach(n => degree[n.id] = 0);
data.links.forEach(l => { degree[l.source]++; degree[l.target]++; });
const neighbors = {};
data.nodes.forEach(n => neighbors[n.id] = new Set());
data.links.forEach(l => { neighbors[l.source].add(l.target); neighbors[l.target].add(l.source); });
const nodeById = new Map(data.nodes.map(n => [n.id, n]));
const radius = d => 5 + Math.sqrt(degree[d.id] || 0) * 2;
const isNeighbor = (a, b) => a.id === b.id || neighbors[a.id].has(b.id);

const sim = d3.forceSimulation(data.nodes)
  .force("link", d3.forceLink(data.links).id(d => d.id).distance(220))
  .force("charge", d3.forceManyBody().strength(-900))
  .force("collide", d3.forceCollide(d => radius(d) + 40))
  .force("center", d3.forceCenter(width / 2, height / 2));

const link = root.append("g").selectAll("line")
  .data(data.links).join("line")
  .attr("class", d => "link" + (d.type === "dashed" ? " dashed" : ""));

const node = root.append("g").selectAll("g")
  .data(data.nodes).join("g").attr("class", "node")
  .on("click", (e, d) => {
    if (e.defaultPrevented || current) return;
    fromGraph = true; animateNext = true;
    location.hash = d.id;                 // change l'URL : graph.html#id
  })
  .on("mouseover", (e, d) => { if (!current) highlight(d); })
  .on("mouseout", () => { if (!current) clearHighlight(); })
  .call(d3.drag().clickDistance(4)
    .on("start", (e, d) => { if (!e.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
    .on("drag",  (e, d) => { d.fx = e.x; d.fy = e.y; })
    .on("end",   (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }));

node.append("circle").attr("r", radius);
node.append("text").text(d => d.label || d.id).attr("dy", d => radius(d) + 16);

function highlight(d) {
  node.classed("dim", n => !isNeighbor(d, n)).classed("active", n => n.id === d.id);
  link.classed("dim", l => l.source.id !== d.id && l.target.id !== d.id)
      .classed("active", l => l.source.id === d.id || l.target.id === d.id);
}
function clearHighlight() {
  node.classed("dim", false).classed("active", false);
  link.classed("dim", false).classed("active", false);
}

sim.on("tick", () => {
  link.attr("x1", d => d.source.x).attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x).attr("y2", d => d.target.y);
  node.attr("transform", d => `translate(${d.x},${d.y})`);
});


const zoom = d3.zoom()
  .scaleExtent([0.2, 4])
  .on("zoom", e => root.attr("transform", e.transform));
const home = () => d3.zoomIdentity.scale(1);
svg.call(zoom).call(zoom.transform, home());

// Contenu de la page
function fillPage(d) {
  $("p-title").textContent = d.label || d.id;
  document.title = (d.label || d.id) + " - " + baseTitle;
  const body = $("p-body");
  body.replaceChildren();
  [].concat(d.description || []).forEach(t => {
    const p = document.createElement("p"); p.textContent = t; body.appendChild(p);
  });
  const list = $("p-list");
  list.replaceChildren();
  (d.articles || []).forEach(a => {
    const li = document.createElement("li"), el = document.createElement("a");
    el.textContent = a.title; el.href = a.url;
    li.appendChild(el); list.appendChild(li);
  });
  $("p-articles").hidden = !(d.articles && d.articles.length);
}


async function showPage(d, animate) {
  current = d;
  fillPage(d);
  clearHighlight();
  node.classed("active", n => n.id === d.id);
  if (animate) {
    const k = Math.min(width, height) * 0.6 / radius(d);
    const t = d3.zoomIdentity.translate(width / 2 - d.x * k, height / 2 - d.y * k).scale(k);
    await svg.transition().duration(ZOOM_IN_DUR).call(zoom.transform, t).end().catch(() => {});
  }
  if (current !== d) return;
  svg.classed("zoomed", true);
  if (current === d) { page.scrollTop = 0; page.classList.add("open"); }
}


function hidePage() {
  current = null; fromGraph = false;
  document.title = baseTitle;
  page.classList.remove("open");
  svg.classed("zoomed", false);
  clearHighlight();
  svg.transition().duration(ZOOM_OUT_DUR).call(zoom.transform, home());
}

function closePage() {
  if (fromGraph) history.back();
  else { history.replaceState(null, "", location.pathname + location.search); hidePage(); }
}


function route() {
  const d = nodeById.get(decodeURIComponent(location.hash.slice(1)));
  if (d && d !== current) { const a = animateNext; animateNext = false; showPage(d, a); }
  else if (!d && current) hidePage();
}

$("back").onclick = closePage;
addEventListener("keydown", e => { if (e.key === "Escape" && current) closePage(); });
addEventListener("hashchange", route);
addEventListener("resize", () => {
  width = innerWidth; height = innerHeight;
  sim.force("center", d3.forceCenter(width / 2, height / 2)).alpha(0.3).restart();
});
route();