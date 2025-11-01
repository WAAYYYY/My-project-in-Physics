// Fonction de Bessel J0 approximée
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

// Création des données
const rMax = 10, n = 100;
const x = Array.from({length: n}, (_, i) => -rMax + (2 * rMax * i) / (n - 1));
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
  title: 'Visualisation 3D of Bessel Function J₀(r)',
  scene: {
    xaxis: {title: 'x'},
    yaxis: {title: 'y'},
    zaxis: {title: 'J₀(r)'}
  }
};

Plotly.newPlot('besselContainer', data, layout);
