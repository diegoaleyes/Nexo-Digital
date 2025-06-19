window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.opacity = "0";
  loader.style.visibility = "hidden";
  loader.style.transition = "all 0.5s ease";
});

const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("sticky", window.scrollY > 50);
});
window.addEventListener("DOMContentLoaded", () => {
  const hour = new Date().getHours();
  if (hour >= 20 || hour < 7) {
    document.body.classList.add("dark-mode");
  }
});
const text = "para Pymes y Autónomos";
let index = 0;
function type() {
  const el = document.getElementById("typed");
  if (index < text.length) {
    el.innerHTML += text.charAt(index);
    index++;
    setTimeout(type, 40);
  }
}
window.addEventListener("DOMContentLoaded", type);

const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

let menuOpen = false;

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("active");

  // Cambiar icono hamburguesa a X
  if (!menuOpen) {
    menuToggle.innerHTML = "&times;";
    menuOpen = true;
  } else {
    menuToggle.innerHTML = "&#9776;";
    menuOpen = false;
  }
});
<script>
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("mobile-menu");
  let menuAbierto = false;

  hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
    if (!menuAbierto) {
      hamburger.innerHTML = "&times;"; // Ícono X
      menuAbierto = true;
    } else {
      hamburger.innerHTML = "☰"; // Ícono hamburguesa
      menuAbierto = false;
    }
  });
</script>
