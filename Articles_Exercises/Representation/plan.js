 const $ = id => document.getElementById(id);

  function surface(x, y) {
    return x * x - y * y;
  }


  function surfaceGradient(x, y) {
    return [2 * x, -2 * y];
  }

  function compile(expression) {
    return math.compile(expression);
  }

  function field2D(P, Q, state) {
    const scope = {x: state[0], y: state[1]};
    return [Number(P.evaluate(scope)), Number(Q.evaluate(scope))];
  }


  function fieldLifted(P, Q, state) {
    const x = state[0];
    const y = state[1];
    const [px, qy] = field2D(P, Q, state);
    const [fx, fy] = surfaceGradient(x, y);
    return [px, qy, fx * px + fy * qy];
  }

 
  function add(a, b) { return [a[0] + b[0], a[1] + b[1]]; }
  function scale(a, s) { return [s * a[0], s * a[1]]; }

  function rk4Step(F, state, dt) {
    const k1 = F(state);
    const k2 = F(add(state, scale(k1, dt / 2)));
    const k3 = F(add(state, scale(k2, dt / 2)));
    const k4 = F(add(state, scale(k3, dt)));
    return add(state, scale(add(add(k1, scale(k2, 2)), add(scale(k3, 2), k4)), dt / 6));
  }

  function integrate(P, Q, initial, T, direction) {
    const steps = 700;
    const dt = direction * T / steps;
    const points = [];
    let state = [...initial];
    points.push([state[0], state[1], surface(state[0], state[1])]);

    for (let i = 0; i < steps; i++) {
      const next = rk4Step(state2D => field2D(P, Q, state2D), state, dt);
      if (!next.every(Number.isFinite)) break;
      if (Math.max(Math.abs(next[0]), Math.abs(next[1])) > 1e4) break;
      points.push([next[0], next[1], surface(next[0], next[1])]);
      state = next;
    }
    return points;
  }

  function saddleGrid(L, n) {
    const x = [], y = [], z = [];
    for (let j = 0; j < n; j++) {
      const yy = -L + 2 * L * j / (n - 1);
      const row = [];
      for (let i = 0; i < n; i++) {
        const xx = -L + 2 * L * i / (n - 1);
        if (j === 0) x.push(xx);
        row.push(surface(xx, yy));
      }
      y.push(yy);
      z.push(row);
    }
    return {x: Array.from({length: n}, (_, i) => -L + 2 * L * i / (n - 1)), y, z};
  }

  function makeTrajectory(points, color, name, L) {
    const valid = points.filter(p => Math.abs(p[0]) <= L && Math.abs(p[1]) <= L);
    return {
      type: "scatter3d",
      x: valid.map(p => p[0]),
      y: valid.map(p => p[1]),
      z: valid.map(p => p[2]),
      mode: "lines",
      line: {color, width: name === "Integral curve" ? 7 : 3},
      name,
      hovertemplate: "x=%{x:.3f}<br>y=%{y:.3f}<br>z=%{z:.3f}<extra></extra>"
    };
  }

  function makeCones(P, Q, L) {
    const x = [], y = [], z = [], u = [], v = [], w = [];
    const n = 13;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const xx = -L + 2 * L * i / (n - 1);
        const yy = -L + 2 * L * j / (n - 1);
        const [px, qy, pz] = fieldLifted(P, Q, [xx, yy]);
        const norm = Math.hypot(px, qy, pz);
        if (!Number.isFinite(norm) || norm < 1e-12) continue;
        x.push(xx); y.push(yy); z.push(surface(xx, yy));
        u.push(px / norm); v.push(qy / norm); w.push(pz / norm);
      }
    }
    return {type: "cone", x, y, z, u, v, w, anchor: "tail", sizemode: "absolute", sizeref: .24, colorscale: [[0, "#172033"], [1, "#172033"]], showscale: false, name: "Tangent field"};
  }

  function draw() {
    try {
      const P = compile($("p").value.trim());
      const Q = compile($("q").value.trim());
      const x0 = Number($("x0").value);
      const y0 = Number($("y0").value);
      const T = Number($("T").value);
      const L = Number($("L").value);
      if (![x0, y0, T, L].every(Number.isFinite) || T <= 0 || L <= 0) throw new Error("Invalid parameters");

      const traces = [];
      const grid = saddleGrid(L, 70);
      traces.push({type: "surface", ...grid, colorscale: "RdBu", opacity: .72, showscale: true, name: "Selle"});
      traces.push(makeCones(P, Q, L));

      const seeds = [[-1.2, -1], [-1.2, -.4], [-1.2, .4], [-1.2, 1], [1.2, -1], [1.2, -.4], [1.2, .4], [1.2, 1]];
      for (const seed of seeds) {
        const backward = integrate(P, Q, seed, T, -1).reverse();
        const forward = integrate(P, Q, seed, T, 1).slice(1);
        traces.push(makeTrajectory(backward.concat(forward), "#F4A261", "Trajectories", L));
      }

      const backward = integrate(P, Q, [x0, y0], T, -1).reverse();
      const forward = integrate(P, Q, [x0, y0], T, 1).slice(1);
      traces.push(makeTrajectory(backward.concat(forward), "#E63946", "Integral curve", L));
      traces.push({type: "scatter3d", x: [x0], y: [y0], z: [surface(x0, y0)], mode: "markers", marker: {size: 7, color: "#00B4D8"}, name: "Initial point"});
      traces.push({type: "scatter3d", x: [0], y: [0], z: [0], mode: "markers+text", marker: {size: 8, color: "#FFD166"}, text: ["critical point"], textposition: "top center", name: "Critical point"});

      Plotly.newPlot("plot", traces, {
        title: `Tangent field on z=x²−y² : (${$("p").value}, ${$("q").value})`,
        template: "plotly_dark",
        height: 780,
        margin: {l: 0, r: 0, b: 0, t: 70},
        scene: {xaxis: {title: "x", range: [-L, L]}, yaxis: {title: "y", range: [-L, L]}, zaxis: {title: "z", range: [-L * L, L * L]}, aspectmode: "manual", aspectratio: {x: 1, y: 1, z: .8}, camera: {eye: {x: 1.6, y: 1.6, z: 1.2}}},
        legend: {orientation: "h", y: 1.02, x: 0}
      }, {responsive: true});
      $("message").textContent = "";
    } catch (error) {
      $("message").textContent = "Invalid: " + error.message;
      Plotly.purge("plot");
    }
  }

  $("draw").addEventListener("click", draw);
  document.querySelectorAll(".example").forEach(button => button.addEventListener("click", () => { $("p").value = button.dataset.p; $("q").value = button.dataset.q; draw(); }));
  draw();