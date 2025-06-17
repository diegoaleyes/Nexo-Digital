// ==== MODO OSCURO AUTOMÁTICO Y MANUAL ====

// Referencia al botón (ajusta el selector si es necesario)
const darkModeToggle = document.querySelector('#darkModeToggle');

// Detectar si el usuario ya tiene una preferencia guardada
const userPreference = localStorage.getItem('darkMode');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Aplicar modo oscuro si hay preferencia o si el sistema lo sugiere
if (userPreference === 'enabled' || (!userPreference && prefersDarkScheme)) {
  document.body.classList.add('dark-mode');
}

// Alternar modo oscuro manualmente
if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Guardar la preferencia del usuario
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
    } else {
      localStorage.setItem('darkMode', 'disabled');
    }
  });
}
