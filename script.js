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
  const images = [
    './mac escritorio.jpg',
    './movil.jpg'
  ];
  const imgElements = document.querySelectorAll('.slider-image');

  let current = 0;
  let next = 1;

  // Inicial
  imgElements[0].src = images[0];
  imgElements[1].src = images[1];

  setInterval(() => {
    // Apaga el actual, enciende el siguiente
    slides[current].style.opacity = 0;
    slides[next].style.opacity = 1;

    // Prepara la siguiente imagen en la capa oculta
    const hidden = current;
    current = next;
    next = (next + 1) % images.length;
    imgElements[hidden].src = images[next];
  }, 8000);
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
