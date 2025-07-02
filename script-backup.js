document.addEventListener('DOMContentLoaded', () => {
  // 👇 Carrusel dinámico de fondo
  const root = document.documentElement;
  const fondoImgs = [
    "url('./mac escritorio.jpg')",
    "url('./seo madera.jpg')",
    "url('./movil.jpg')"
  ];
  let current = 0;
  root.style.setProperty('--img-url', fondoImgs[current]);
  setInterval(() => {
    current = (current + 1) % fondoImgs.length;
    root.style.setProperty('--img-url', fondoImgs[current]);
  }, 6000);

  // 👇 Hero alternando imágenes
  const slides = document.querySelectorAll('.hero__slider');
  const imgEls  = document.querySelectorAll('.slider-image');
  const images  = ['./mac escritorio.jpg','./movil.jpg'];
  let currentHero = 0, nextHero = 1;
  imgEls[0].src = images[0];
  imgEls[1].src = images[1];
  setInterval(() => {
    slides[currentHero].style.opacity = 0;
    slides[nextHero].style.opacity = 1;
    const hidden = currentHero;
    currentHero = nextHero;
    nextHero = (nextHero + 1) % images.length;
    imgEls[hidden].src = images[nextHero];
  }, 8000);

  // 👇 Animaciones fade-in con IntersectionObserver
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
  // ———————— Menú hamburguesa simplificado ————————
const toggle = document.querySelector('.nav__toggle');
const navList = document.querySelector('.nav__list');

toggle.addEventListener('click', () => {
  console.log('🔔 clic hamburguesa, clases antes:', navList.classList.value);

  // Fallback directo: forzamos display
  if ( navList.style.display === 'flex' ) {
    navList.style.display = 'none';
  } else {
    navList.style.display = 'flex';
  }

  // También seguimos intentando con la clase
  navList.classList.toggle('active');
  toggle.classList.toggle('open');

  console.log('🔔 clic hamburguesa, clases después:', navList.classList.value,
              'style.display=', navList.style.display);
});

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  // ✅ Este bloque es el importante para “Leer más”
  document.querySelectorAll('.btn-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const blogPost = button.closest('.blog-post');
      blogPost.classList.toggle('active');
    });
  });
  const form = document.getElementById('formulario-contacto');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  emailjs.sendForm('service_ba3pyxw', 'template_ob46l7k', this)
    .then(() => {
      alert('Mensaje enviado con éxito. ¡Gracias por contactarte!');
      form.reset();
    }, (error) => {
      alert('Error al enviar. Por favor, probá de nuevo.');
      console.error('EmailJS Error:', error);
    });
});

});
