// ═══════════════════════════════════════════════════════
// NEXODIGITAL - JAVASCRIPT MOBILE-FIRST OPTIMIZADO
// Versión optimizada para rendimiento móvil con throttling
// ═══════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  
  // ───────────── UTILIDADES MOBILE-FIRST ─────────────
  
  // Throttle function optimizada para móvil
  const throttle = (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  };

  // Detección de dispositivo móvil
  const isMobile = () => {
    return window.innerWidth <= 767 || 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  // ───────────── CARRUSEL DINÁMICO DE FONDO ─────────────
  // Optimizado para móvil con menor frecuencia de cambio
  
  const root = document.documentElement;
  const fondoImgs = [
    "url('./mac escritorio.jpg')",
    "url('./seo madera.jpg')", 
    "url('./movil.jpg')"
  ];
  
  let currentBg = 0;
  root.style.setProperty('--img-url', fondoImgs[currentBg]);
  
  // Menor frecuencia en móvil para mejor rendimiento
  const bgInterval = isMobile() ? 6000 : 4000;
  
  setInterval(() => {
    currentBg = (currentBg + 1) % fondoImgs.length;
    root.style.setProperty('--img-url', fondoImgs[currentBg]);
  }, bgInterval);

  // ───────────── HERO SLIDER OPTIMIZADO ─────────────
  
  const slides = document.querySelectorAll('.hero__slider');
  const imgEls = document.querySelectorAll('.slider-image');
  const images = ['./mac escritorio.jpg', './movil.jpg', './ordenador light.jpg'];
  
  if (slides.length > 0 && imgEls.length > 0) {
    let currentHero = 0;
    let nextHero = 1;
    
    // Precargar imágenes
    imgEls[0].src = images[0];
    imgEls[1].src = images[1];
    
    // Mayor intervalo en móvil para mejor performance
    const heroInterval = isMobile() ? 9000 : 6000;
    
    setInterval(() => {
      if (slides[currentHero] && slides[nextHero]) {
        slides[currentHero].style.opacity = 0;
        slides[nextHero].style.opacity = 1;
        
        const hidden = currentHero;
        currentHero = nextHero;
        nextHero = (nextHero + 1) % images.length;
        
        // Cambiar imagen de forma lazy
        setTimeout(() => {
          if (imgEls[hidden]) {
            imgEls[hidden].src = images[nextHero];
          }
        }, 1000);
      }
    }, heroInterval);
  }

  // ───────────── ANIMACIONES INTERSECTION OBSERVER ─────────────
  // Optimizado para móvil con threshold más sensible
  
  const observeElements = () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length === 0) return;
    
    // Threshold más sensible en móvil
    const threshold = isMobile() ? 0.1 : 0.3;
    
    const observerOptions = {
      threshold: threshold,
      rootMargin: isMobile() ? '20px' : '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    fadeElements.forEach(el => observer.observe(el));
  };
  
  observeElements();

  // ───────────── NAVEGACIÓN MÓVIL OPTIMIZADA ─────────────
  
  const setupMobileNavigation = () => {
    const toggle = document.querySelector('.nav__toggle');
    const navList = document.querySelector('.nav__list');
    const navLinks = document.querySelectorAll('.nav__link');
    const body = document.body;
    
    if (!toggle || !navList) return;
    
    let isMenuOpen = false;
    
    // Toggle del menú
    const toggleMenu = () => {
      isMenuOpen = !isMenuOpen;
      
      navList.classList.toggle('active', isMenuOpen);
      toggle.classList.toggle('open', isMenuOpen);
      
      // Prevenir scroll del body cuando menú está abierto (móvil)
      if (isMobile()) {
        body.style.overflow = isMenuOpen ? 'hidden' : '';
      }
      
      // Fallback para displays problemáticos
      navList.style.display = isMenuOpen ? 'flex' : '';
    };
    
    // Event listener para toggle
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    });
    
    // Cerrar menú al hacer click en un enlace (móvil)
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (isMobile() && isMenuOpen) {
          toggleMenu();
        }
      });
    });
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
      if (isMobile() && isMenuOpen && 
          !navList.contains(e.target) && 
          !toggle.contains(e.target)) {
        toggleMenu();
      }
    });
    
    // Cerrar menú al cambiar tamaño de ventana
    const handleResize = throttle(() => {
      if (!isMobile() && isMenuOpen) {
        toggleMenu();
      }
    }, 250);
    
    window.addEventListener('resize', handleResize);
  };
  
  setupMobileNavigation();

  // ───────────── SMOOTH SCROLL OPTIMIZADO ─────────────
  
  const setupSmoothScroll = () => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (!href || href === '#') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (!target) return;
        
        // Offset ajustado para móvil
        const offset = isMobile() ? 60 : 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        // Scroll suave optimizado
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Actualizar estado activo del nav
        updateActiveNav(href);
      });
    });
  };
  
  // Actualizar enlace activo en navegación
  const updateActiveNav = (targetHref) => {
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === targetHref) {
        link.classList.add('active');
      }
    });
  };
  
  setupSmoothScroll();

  // ───────────── BLOG "LEER MÁS" FUNCIONALIDAD ─────────────
  
  const setupBlogToggle = () => {
    const toggleButtons = document.querySelectorAll('.btn-toggle');
    
    toggleButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        const blogPost = button.closest('.blog-post');
        if (!blogPost) return;
        
        const isActive = blogPost.classList.contains('active');
        
        // Toggle estado
        blogPost.classList.toggle('active');
        
        // Cambiar texto del botón
        button.textContent = isActive ? 'Leer más' : 'Leer menos';
        
        // Scroll suave al contenido expandido en móvil
        if (!isActive && isMobile()) {
          setTimeout(() => {
            blogPost.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
          }, 300);
        }
      });
    });
  };
  
  setupBlogToggle();

  // ───────────── FORMULARIO DE CONTACTO ─────────────
  
  const setupContactForm = () => {
    const form = document.getElementById('formulario-contacto');
    if (!form) return;
    
    // Validación mejorada para móvil
    const validateForm = (formData) => {
      const errors = [];
      
      if (!formData.get('nombre')?.trim()) {
        errors.push('El nombre es requerido');
      }
      
      const email = formData.get('email')?.trim();
      if (!email) {
        errors.push('El email es requerido');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('El email no es válido');
      }
      
      return errors;
    };
    
    // Mostrar errores de forma mobile-friendly
    const showErrors = (errors) => {
      // Remover errores previos
      const existingErrors = form.querySelectorAll('.error-message');
      existingErrors.forEach(error => error.remove());
      
      errors.forEach(error => {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginBottom = '0.5rem';
        errorDiv.textContent = error;
        
        form.insertBefore(errorDiv, form.firstChild);
      });
    };
    
    // Mostrar mensaje de éxito
    const showSuccess = () => {
      const successDiv = document.createElement('div');
      successDiv.className = 'success-message';
      successDiv.style.color = '#27ae60';
      successDiv.style.fontSize = '0.9rem';
      successDiv.style.marginBottom = '1rem';
      successDiv.style.padding = '0.75rem';
      successDiv.style.backgroundColor = '#d5f4e6';
      successDiv.style.borderRadius = '4px';
      successDiv.textContent = '¡Mensaje enviado con éxito! Te responderemos pronto.';
      
      form.insertBefore(successDiv, form.firstChild);
      
      // Remover mensaje después de 5 segundos
      setTimeout(() => {
        successDiv.remove();
      }, 5000);
    };
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const errors = validateForm(formData);
      
      if (errors.length > 0) {
        showErrors(errors);
        return;
      }
      
      // Limpiar errores previos
      const existingErrors = form.querySelectorAll('.error-message, .success-message');
      existingErrors.forEach(error => error.remove());
      
      // Deshabilitar botón durante envío
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
      
      // Enviar con EmailJS
      emailjs.sendForm('service_ba3pyxw', 'template_ob46l7k', this)
        .then(() => {
          showSuccess();
          form.reset();
        })
        .catch((error) => {
          console.error('EmailJS Error:', error);
          showErrors(['Error al enviar. Por favor, inténtalo de nuevo.']);
        })
        .finally(() => {
          // Rehabilitar botón
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        });
    });
  };
  
  setupContactForm();

  // ───────────── PERFORMANCE OPTIMIZATIONS ─────────────
  
  // Lazy loading de imágenes optimizado para móvil
  const setupLazyLoading = () => {
    const images = document.querySelectorAll('img[src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // Optimizar calidad de imagen para móvil
            if (isMobile() && img.src.includes('.jpg')) {
              // Aquí podrías implementar lógica para servir imágenes de menor resolución
              // Por ejemplo, añadir parámetros de query o usar srcset
            }
            
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px'
      });
      
      images.forEach(img => imageObserver.observe(img));
    }
  };
  
  setupLazyLoading();

  // ───────────── SCROLL PERFORMANCE ─────────────
  
  // Throttled scroll handler para mejor performance en móvil
  let ticking = false;
  
  const updateOnScroll = () => {
    // Aquí puedes añadir lógica de scroll como parallax, pero optimizada para móvil
    // Por ejemplo, deshabilitar efectos pesados en dispositivos móviles
    
    if (!isMobile()) {
      // Efectos de scroll solo en desktop
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      // Parallax sutil en hero
      const hero = document.querySelector('.hero');
      if (hero) {
        hero.style.transform = `translate3d(0, ${rate}px, 0)`;
      }
    }
    
    ticking = false;
  };
  
  const requestScrollUpdate = () => {
    if (!ticking) {
      requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  };
  
  // Solo aplicar scroll effects en desktop
  if (!isMobile()) {
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  }

  // ───────────── TOUCH GESTURES PARA MÓVIL ─────────────
  
  const setupTouchGestures = () => {
    if (!isMobile()) return;
    
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
      if (!touchStartX || !touchStartY) return;
      
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;
      
      // Detectar swipe horizontal en carrusel si existe
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        const swiper = document.querySelector('.proyectos-swiper');
        if (swiper && window.swiperInstance) {
          if (diffX > 0) {
            window.swiperInstance.slideNext();
          } else {
            window.swiperInstance.slidePrev();
          }
        }
      }
      
      touchStartX = 0;
      touchStartY = 0;
    }, { passive: true });
  };
  
  setupTouchGestures();

  // ───────────── INICIALIZACIÓN FINAL ─────────────
  
  console.log('🚀 NexoDigital Mobile-First JavaScript cargado correctamente');
  console.log(`📱 Modo: ${isMobile() ? 'Móvil' : 'Desktop'}`);
  console.log(`🖥️ Viewport: ${window.innerWidth}x${window.innerHeight}`);
  
  // Marcar como inicializado
  document.body.classList.add('js-loaded');
  
  // Performance logging en desarrollo
  if (window.location.hostname === 'localhost' || window.location.hostname.includes('repl')) {
    setTimeout(() => {
      console.log('⚡ Performance inicial:', {
        dom: performance.now(),
        mobile: isMobile(),
        images: document.querySelectorAll('img').length,
        fadeElements: document.querySelectorAll('.fade-in').length
      });
    }, 1000);
  }

});

// ───────────── FUNCIONES GLOBALES ─────────────

// Función global para reinicializar componentes (útil para SPA)
window.nexoDigitalReinit = () => {
  // Disparar evento personalizado para reinicialización
  const event = new CustomEvent('nexoDigitalInit');
  document.dispatchEvent(event);
};

// Función global para detectar cambios de viewport
window.nexoDigitalViewportChange = () => {
  const event = new CustomEvent('viewportChange', {
    detail: {
      isMobile: window.innerWidth <= 767,
      width: window.innerWidth,
      height: window.innerHeight
    }
  });
  document.dispatchEvent(event);
};

// Listener para cambios de viewport
window.addEventListener('resize', throttle(() => {
  window.nexoDigitalViewportChange();
}, 250));