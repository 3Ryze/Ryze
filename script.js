// ===== CURSOR GLOW EFFECT =====
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE NAVIGATION =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile nav when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ANIMATED COUNTER =====
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 40);
};

// Intersection Observer for counter animation
const statNumbers = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-count'));
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => counterObserver.observe(stat));

// ===== PRICING TABS =====
const pricingTabs = document.querySelectorAll('.pricing-tab');
const pricingGrids = document.querySelectorAll('.pricing-grid');

pricingTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active from all tabs
        pricingTabs.forEach(t => t.classList.remove('active'));
        // Add active to clicked tab
        tab.classList.add('active');

        // Show corresponding grid
        const tabId = tab.getAttribute('data-tab');
        pricingGrids.forEach(grid => {
            grid.classList.remove('active');
            if (grid.id === tabId) {
                grid.classList.add('active');
            }
        });
    });
});



// ===== COPY TO CLIPBOARD =====
const copyBtns = document.querySelectorAll('.copy-btn');

copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const textToCopy = btn.getAttribute('data-copy');
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Show feedback
            const originalIcon = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i>';
            btn.style.background = 'var(--accent-primary)';

            setTimeout(() => {
                btn.innerHTML = originalIcon;
                btn.style.background = '';
            }, 2000);
        });
    });
});

// ===== SCROLL ANIMATIONS =====
const animateElements = document.querySelectorAll('.service-card, .price-card, .payment-card');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            scrollObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(el);
});

// ===== SECTION HEADER ANIMATIONS =====
const sectionHeaders = document.querySelectorAll('.section-header');

const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            headerObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

sectionHeaders.forEach(header => {
    header.style.opacity = '0';
    header.style.transform = 'translateY(30px)';
    header.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    headerObserver.observe(header);
});

// ===== TILT EFFECT ON CARDS =====
const cards = document.querySelectorAll('.service-card, .price-card, .cta-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.overflow = 'auto';

    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-buttons, .hero-stats');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.15}s`;
    });
});

// ===== PARALLAX EFFECT ON HERO ORBS =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');

    if (orb1 && orb2) {
        orb1.style.transform = `translate(${scrolled * 0.1}px, ${scrolled * 0.1}px)`;
        orb2.style.transform = `translate(-${scrolled * 0.05}px, -${scrolled * 0.05}px)`;
    }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== CONSOLE EASTER EGG =====
console.log('%c🎮 Welcome to 3ryze\'s Portfolio!', 'font-size: 24px; font-weight: bold; color: #ffffff;');
console.log('%cLooking for a Minecraft developer? You\'re in the right place!', 'font-size: 14px; color: #cccccc;');
console.log('%cDiscord: 3ryze', 'font-size: 12px; color: #a0a0b0;');
