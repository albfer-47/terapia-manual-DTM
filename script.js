/**
 * script.js
 * Funcionalidades de UI e tracking para fisioterapia pós-parto
 */

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const animateElements = document.querySelectorAll('.problema-card, .depoimento-card, .modulo-card, .diferencial-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Contador de vagas (simulação de escassez)
let vagasRestantes = 20;
const atualizarVagas = () => {
    if (Math.random() > 0.95 && vagasRestantes > 5) {
        vagasRestantes--;
    }
};
setInterval(atualizarVagas, 30000);

// Track de scroll para analytics (simulado)
let scrollDepth = 0;
window.addEventListener('scroll', () => {
    const currentScroll = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
    if (currentScroll > scrollDepth) {
        scrollDepth = currentScroll;
        if (scrollDepth === 25 || scrollDepth === 50 || scrollDepth === 75 || scrollDepth === 100) {
            console.log(`Usuário scrollou ${scrollDepth}% da página`);
        }
    }
});

// Click tracking nos CTAs
document.querySelectorAll('.cta-button, .whatsapp-button').forEach(button => {
    button.addEventListener('click', () => {
        console.log('CTA clicado:', button.textContent.trim());
    });
});

// Efeito parallax suave no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// Performance: throttle para eventos de scroll
function throttle(func, limit) {
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
}

const throttledScroll = throttle(() => {
    // Funções de scroll aqui
}, 100);

window.addEventListener('scroll', throttledScroll);

// Detectar tipo de dispositivo
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
    document.body.classList.add('mobile-device');
}

// Adicionar timestamp ao link do WhatsApp para tracking
document.addEventListener('DOMContentLoaded', () => {
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        const timestamp = new Date().toISOString();
        const originalHref = link.getAttribute('href');
        // Adiciona timestamp para tracking
        console.log('WhatsApp link preparado para:', timestamp);
    });
});

// Preload da imagem de background
const preloadImage = (url) => {
    const img = new Image();
    img.src = url;
};
preloadImage('pos-parto-background.jpg');