
window.addEventListener('DOMContentLoaded', () => {
    populateUI();
});

function populateUI() {
    // Preloader
    document.querySelector('.preloader-logo').textContent = config.name;

    // Header
    document.querySelector('.logo').textContent = config.name;

    // Hero
    const heroContent = document.querySelector('.hero-content');
    heroContent.querySelector('h1 .typing-effect').parentElement.setAttribute('data-phrases', JSON.stringify(config.hero.typing_effects));
    heroContent.querySelector('p').textContent = config.hero.subtitle;
    heroContent.querySelector('.cta-button').textContent = config.hero.cta;

    // About
    const aboutSection = document.querySelector('#about');
    aboutSection.innerHTML = `
        <div class="about-container">
            <img src="${config.about.image}" alt="Profile Picture of ${config.name}" class="about-image">
            <div class="about-text">
                <h2>${config.about.title}</h2>
                <p>${config.about.description}</p>
            </div>
        </div>
        <div class="skills-grid">
            ${config.skills.map(skill => `
                <div class="skill-card">
                    <div class="skill-icon" aria-hidden="true">${skill.icon}</div>
                    <h3>${skill.title}</h3>
                    <p>${skill.description}</p>
                </div>
            `).join('')}
        </div>
    `;

    // SMPs
    const smpsSection = document.querySelector('#smps');
    smpsSection.innerHTML = `
        <h2>${config.smps.title}</h2>
        <div class="smp-grid">
            ${config.smps.smp_list.map(smp => `
                <div class="smp-card">
                    <h3>${smp.name}</h3>
                    <p>${smp.description}</p>
                </div>
            `).join('')}
        </div>
    `;

    // Reviews
    const reviewsSection = document.querySelector('#reviews');
    reviewsSection.innerHTML = `
        <h2>${config.reviews.title}</h2>
        <div class="review-grid">
            ${config.reviews.review_list.map(review => `
                <div class="review-card">
                    <p>"${review.quote}"</p>
                    <span>${review.author}</span>
                </div>
            `).join('')}
        </div>
    `;

    // Pricing
    const pricingSection = document.querySelector('#pricing');
    pricingSection.innerHTML = `
        <h2>${config.pricing.title}</h2>
        <p class="pricing-notice">${config.pricing.notice}</p>
        <div class="pricing-grid">
            ${config.pricing.tiers.map(tier => `
                <div class="pricing-card">
                    <h3>${tier.title}</h3>
                    <ul>
                        ${tier.prices.map(price => `<li><strong>${price.tier}:</strong> ${price.price}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        </div>
        <div class="payment-methods">
            <h3>Payment Methods</h3>
            <p>${config.pricing.payment_methods}</p>
        </div>
    `;

    // Contact
    const contactSection = document.querySelector('#contact');
    contactSection.innerHTML = `
        <div class="contact-card">
            <div class="contact-header">
                <h2>${config.contact.title}</h2>
                <p>${config.contact.subtitle}</p>
            </div>
            <div class="contact-options">
                ${config.contact.options.map(option => {
                    if (option.type === 'copy') {
                        return `
                            <div class="contact-option copy-button" data-copy-text="${option.value}" role="button" tabindex="0">
                                <div class="contact-icon">${option.icon}</div>
                                <div class="contact-text">
                                    <span>${option.text}</span>
                                    <strong>${option.value}</strong>
                                </div>
                                <div class="contact-action">
                                    <span class="copy-feedback">Copied!</span>
                                    <span>${option.action}</span>
                                </div>
                            </div>
                        `;
                    } else if (option.type === 'link') {
                        return `
                            <a href="${option.link}" target="_blank" class="contact-option">
                                <div class="contact-icon">${option.icon}</div>
                                <div class="contact-text">
                                    <span>${option.text}</span>
                                    <strong>${option.value}</strong>
                                </div>
                                <div class="contact-action">
                                    <span>${option.action}</span>
                                </div>
                            </a>
                        `;
                    }
                }).join('')}
            </div>
        </div>
    `;

    // Footer
    document.querySelector('footer').innerHTML = `<p>${config.footer.text}</p>`;

    // After populating UI, re-initialize all the dynamic functionalities
    initDynamicFunctionalities();
}

function initDynamicFunctionalities() {
    // --- Preloader ---
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('loaded');
        setTimeout(() => preloader.remove(), 1000);
    }

    // --- Header Scroll Effect ---
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // --- Scroll Progress Bar ---
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            progressBar.style.width = `${scrollPercent}%`;
        }, { passive: true });
    }

    // --- Custom Cursor Effect ---
    const cursorDot = document.querySelector('.cursor-dot');
    if (cursorDot) {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                cursorDot.style.transform = `translate(${e.clientX - cursorDot.offsetWidth / 2}px, ${e.clientY - cursorDot.offsetHeight / 2}px)`;
            });
        });

        const interactiveElements = document.querySelectorAll(
            'a, button, .skill-card, .portfolio-item, .smp-card, .review-card, .pricing-card'
        );
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-interact');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-interact');
            });
        });
    }

    // --- Hero Parallax & Typing Effect ---
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    if (hero && heroContent) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xPos = (x / rect.width - 0.5) * 20;
            const yPos = (y / rect.height - 0.5) * 20;

            requestAnimationFrame(() => {
                heroContent.style.transform = `translateX(${xPos * -1}px) translateY(${yPos * -1}px)`;
            });
        });
    }

    // --- Mobile Navigation ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    const toggleNav = () => {
        navLinks.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');
    };

    hamburger.addEventListener('click', toggleNav);
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                toggleNav();
            }
        });
    });

    // --- Scroll-based Animations ---
    const animatedSections = document.querySelectorAll('.content-section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const gridItems = entry.target.querySelectorAll('.skill-card, .portfolio-item, .smp-card, .review-card, .pricing-card');
                gridItems.forEach((item, index) => {
                    const delay = index * 100;
                    item.style.transitionDelay = `${delay}ms`;

                    const cleanupOnTransitionEnd = (e) => {
                        if (e.propertyName === 'opacity') {
                            item.style.transitionDelay = '';
                            item.removeEventListener('transitionend', cleanupOnTransitionEnd);
                        }
                    };
                    item.addEventListener('transitionend', cleanupOnTransitionEnd);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedSections.forEach(section => {
        observer.observe(section);
    });

    // --- Typing Animation ---
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        const phrases = JSON.parse(typingElement.parentElement.getAttribute('data-phrases'));
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeWriter() {
            const currentPhrase = phrases[phraseIndex];
            let text = '';

            if (isDeleting) {
                text = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                text = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }
            typingElement.textContent = text;

            const typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentPhrase.length) {
                setTimeout(() => { isDeleting = true; typeWriter(); }, 2000);
                return;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }

            setTimeout(typeWriter, typeSpeed);
        }
        setTimeout(typeWriter, 500);
    }

    // --- Card Spotlight & 3D Tilt Effect ---
    const interactiveCards = document.querySelectorAll('.skill-card, .portfolio-item, .smp-card, .review-card, .pricing-card');
    interactiveCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const { width, height } = rect;
            const rotateX = (y / height - 0.5) * -20;
            const rotateY = (x / width - 0.5) * 20;

            requestAnimationFrame(() => {
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            });
        });

        card.addEventListener('mouseleave', () => {
            requestAnimationFrame(() => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    });

    // --- SVG Drawing Animation Setup ---
    document.querySelectorAll('.drawable-svg path').forEach(path => {
        try {
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
        } catch (e) {
            console.error("Could not initialize SVG path for drawing animation.", e);
        }
    });

    // --- Copy to Clipboard ---
    const copyButton = document.querySelector('.copy-button');
    if (copyButton) {
        copyButton.addEventListener('click', () => {
            if (copyButton.classList.contains('copied')) {
                return;
            }
            const textToCopy = copyButton.dataset.copyText;
            navigator.clipboard.writeText(textToCopy).then(() => {
                copyButton.classList.add('copied');
                setTimeout(() => {
                    copyButton.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    }

    // --- Back to Top Button ---
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }, { passive: true });
    }

    // --- Three.js 3D Background ---
    const threeJsContainer = document.getElementById('three-js-container');
    if (threeJsContainer && typeof THREE !== 'undefined' && THREE.EffectComposer && THREE.RenderPass && THREE.UnrealBloomPass) {
        let scene, camera, renderer, object, particles, composer, bloomPass;
        let mouse = new THREE.Vector2();

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 5;

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        threeJsContainer.appendChild(renderer.domElement);

        const geometry = new THREE.TorusKnotGeometry(1.5, 0.5, 100, 16);
        const material = new THREE.MeshNormalMaterial();
        object = new THREE.Mesh(geometry, material);
        scene.add(object);

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xff8fab, 2, 100);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);
        
        const pointLight2 = new THREE.PointLight(0xffc2d1, 2, 100);
        pointLight2.position.set(-5, -5, -2);
        scene.add(pointLight2);

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 7000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 20;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.01,
            color: 0xffffff
        });

        particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        const renderScene = new THREE.RenderPass(scene, camera);
        bloomPass = new THREE.UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            1.2, 
            0.6, 
            0.05
        );
        composer = new THREE.EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);

        function onMouseMove(event) {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        }
        window.addEventListener('mousemove', onMouseMove, { passive: true });

        const clock = new THREE.Clock();
        function animate() {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();
            object.rotation.y = elapsedTime * 0.1;
            object.rotation.x = elapsedTime * 0.05;
            object.rotation.z = elapsedTime * 0.05;

            object.rotation.y += mouse.x * 0.5 - object.rotation.y * 0.1;
            object.rotation.x += mouse.y * 0.5 - object.rotation.x * 0.1;

            particles.rotation.y = -elapsedTime * 0.02;
            particles.rotation.x += (mouse.y * 0.1 - particles.rotation.x) * 0.02;
            particles.rotation.y += (mouse.x * 0.1 - particles.rotation.y) * 0.02;

            camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.05;
            camera.position.y += (mouse.y * 1.5 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            composer.render();
        }
        animate();

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            composer.setSize(window.innerWidth, window.innerHeight);
            bloomPass.resolution.set(window.innerWidth, window.innerHeight);
        }
        window.addEventListener('resize', onWindowResize, false);
    }
}
