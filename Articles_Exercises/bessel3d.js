
function besselJ0(x) {
  if (x === 0) return 1;
  let sum = 0;
  for (let k = 0; k < 20; k++) {
    sum += Math.pow(-1, k) * Math.pow(x / 2, 2 * k) / (factorial(k) * factorial(k));
  }
  return sum;
}

function factorial(n) {
  if (n === 0 || n === 1) return 1;
  let f = 1;
  for (let i = 2; i <= n; i++) f *= i;
  return f;
}


const rMax = 10, n = 100;
const x = Array.from({ length: n }, (_, i) => -rMax + (2 * rMax * i) / (n - 1));
const y = [...x];
const z = [];

for (let i = 0; i < n; i++) {
  z[i] = [];
  for (let j = 0; j < n; j++) {
    const r = Math.sqrt(x[i] * x[i] + y[j] * y[j]);
    z[i][j] = besselJ0(r);
  }
}

const data = [{
  z: z,
  x: x,
  y: y,
  type: 'surface',
  colorscale: 'Viridis'
}];


const layout = {
  title: {
    text: 'Bessel Function J₀(r)',
    font: { size: 14 },
    x: 0.5,
    y: 0.9
  },
  margin: { l: 0, r: 0, b: 0, t: 30 }, 
  autosize: true,
  scene: {
    aspectmode: 'manual',
    aspectratio: { x: 1, y: 1, z: 1 },
    xaxis: {
      title: { text: 'x', font: { size: 9 } },
      tickfont: { size: 8 }
    },
    yaxis: {
      title: { text: 'y', font: { size: 9 } },
      tickfont: { size: 8 }
    },
    zaxis: {
      title: { text: 'J₀(r)', font: { size: 9 } },
      tickfont: { size: 8 }
    }
  }
};


Plotly.newPlot('bessel3D', data, layout, { responsive: true });

window.addEventListener('resize', () => {
  Plotly.Plots.resize('bessel3D');
});

