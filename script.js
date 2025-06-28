// Loader al cargar la página
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.transition = "all 0.5s ease";
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
  }
});

// Header sticky al hacer scroll
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("sticky", window.scrollY > 50);
});

// Lógica principal una vez que el DOM está cargado
window.addEventListener("DOMContentLoaded", () => {
  // Activar modo oscuro automáticamente por la noche
  const hour = new Date().getHours();
  if (hour >= 20 || hour < 7) {
    document.body.classList.add("dark-mode");
  }

  // Efecto de tipeo
  const text = "para Pymes y Autónomos";
  const el = document.getElementById("typed");
  if (el) {
    let index = 0;
    function type() {
      if (index < text.length) {
        el.innerHTML += text.charAt(index);
        index++;
        setTimeout(type, 40);
      }
    }
    type();
  }

  // Menú hamburguesa
  const hamburger = document.getElementById("hamburger");
  const navbar = document.getElementById("navbar");

  if (hamburger && navbar) {
    hamburger.addEventListener("click", () => {
      navbar.classList.toggle("active");
      hamburger.innerHTML = navbar.classList.contains("active") ? "&times;" : "☰";
    });
  }
});
