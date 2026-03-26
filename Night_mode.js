const html = document.documentElement;

// S'exécute sur TOUTES les pages au chargement
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  html.setAttribute('data-bs-theme', 'dark');
}

// Le bouton n'existe que sur l'index, donc on vérifie avant
const btn = document.getElementById('darkModeBtn');
if (btn) {
  const icon = document.getElementById('modeIcon');
  const label = document.getElementById('modeLabel');

  // Synchroniser l'état du bouton avec le thème sauvegardé
  let isDark = savedTheme === 'dark';
  if (isDark) {
    icon.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
    label.textContent = 'Light mode';
  }

  btn.addEventListener('click', () => {
    isDark = !isDark;

    btn.classList.add('rotating');
    setTimeout(() => btn.classList.remove('rotating'), 500);

    if (isDark) {
      html.setAttribute('data-bs-theme', 'dark');
      icon.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
      label.textContent = 'Light mode';
      localStorage.setItem('theme', 'dark');
    } else {
      html.setAttribute('data-bs-theme', 'light');
      icon.innerHTML = '<i class="bi bi-sun-fill"></i>';
      label.textContent = 'Night mode';
      localStorage.setItem('theme', 'light');
    }
  });
}