document.addEventListener('DOMContentLoaded', () => {
  // Carrusel dinámico de fondo
  const root = document.documentElement;
  const fondoImgs = [
    "url('./mac escritorio.jpg')",
    "url('./seo madera.jpg')",
    "url('./movil.jpg')"
  ];
  let current = 0;

  // 👇 Establecer imagen inicial al cargar
  root.style.setProperty('--img-url', fondoImgs[current]);

  // 👇 Rotar imágenes cada 6 segundos
  setInterval(() => {
    current = (current + 1) % fondoImgs.length;
    root.style.setProperty('--img-url', fondoImgs[current]);
  }, 6000);
});


document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.hero__slider');
  const imgEls  = document.querySelectorAll('.slider-image');
  const images  = ['./mac escritorio.jpg','./movil.jpg'];

  let current = 0, next = 1;
  imgEls[0].src = images[0];
  imgEls[1].src = images[1];

  setInterval(() => {
    slides[current].style.opacity = 0;
    slides[next].style.opacity   = 1;
    const hidden = current;
    current = next;
    next    = (next + 1) % images.length;
    imgEls[hidden].src = images[next];
  }, 8000);
  
  // El resto de tu JS (fade-in, hamburguesa…) sigue igual
});



document.querySelectorAll('.fade-in').forEach(el => {
  new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 }).observe(el);
});
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav__toggle');
  const navList = document.querySelector('.nav__list');

  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      navList.classList.toggle('open');
    });
  }
});
