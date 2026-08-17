// ================== PAGE LOADER ==================
window.addEventListener('load', () => {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500);
    }
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});


// ================== SCROLL PROGRESS BAR ==================
(function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });
})();


// ================== BACK TO TOP BUTTON ==================
(function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();


// ================== PARTICLES BACKGROUND ==================
(function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null };

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.golden = Math.random() > 0.7;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (mouse.x !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const force = (150 - dist) / 150;
                    this.x -= (dx / dist) * force * 1.5;
                    this.y -= (dy / dist) * force * 1.5;
                }
            }

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            if (this.golden) {
                ctx.fillStyle = `rgba(212, 160, 23, ${this.opacity})`;
            } else {
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.4})`;
            }
            ctx.fill();
        }
    }

    const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    const opacity = (1 - dist / 120) * 0.15;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(212, 160, 23, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        requestAnimationFrame(animate);
    }
    animate();

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });
})();


// ================== CURSOR GLOW ==================
(function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow) return;

    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
        glow.classList.add('active');
    });

    document.addEventListener('mouseleave', () => {
        glow.classList.remove('active');
    });
})();


// ================== 3D TILT ON CARDS ==================
(function init3DTilt() {
    const tiltCards = document.querySelectorAll('.project-card, .service-card, .about-box, .achievement-card, .document-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -8;
            const rotateY = (x - centerX) / centerX * 8;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
})();


// ================== 3D TILT ON CODING BANNER ==================
(function initProfileTilt() {
    const banner = document.querySelector('.coding-banner');
    if (!banner) return;

    banner.addEventListener('mousemove', (e) => {
        const rect = banner.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -12;
        const rotateY = (x - centerX) / centerX * 12;

        banner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    banner.addEventListener('mouseleave', () => {
        banner.style.transform = '';
    });
})();


// ================== 3D TILT ON CONTACT FORM ==================
(function initFormTilt() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('mousemove', (e) => {
        const rect = form.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -3;
        const rotateY = (x - centerX) / centerX * 3;

        form.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    form.addEventListener('mouseleave', () => {
        form.style.transform = '';
    });
})();


// ================== 3D TILT ON RESUME LEFT PANEL ==================
(function initResumeTilt() {
    const resumeLeft = document.querySelector('.resume-left');
    if (!resumeLeft) return;

    resumeLeft.addEventListener('mousemove', (e) => {
        const rect = resumeLeft.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -5;
        const rotateY = (x - centerX) / centerX * 5;

        resumeLeft.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    resumeLeft.addEventListener('mouseleave', () => {
        resumeLeft.style.transform = '';
    });
})();


// ================== PARALLAX ON SCROLL ==================
(function initParallax() {
    const homeSection = document.querySelector('.home');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (homeSection && scrolled < window.innerHeight) {
            homeSection.style.setProperty('--parallax-y', scrolled * 0.3 + 'px');
        }
    });
})();


// ================== TYPING EFFECT FOR RESUME ==================
const resumeTyping = document.getElementById("typing-text");

if (resumeTyping) {
    const resumeText = "I specialize in building clean, responsive, and user-friendly web interfaces.";
    let i = 0;

    function typeEffect() {
        if (i < resumeText.length) {
            resumeTyping.innerHTML += resumeText.charAt(i);
            i++;
            setTimeout(typeEffect, 35);
        }
    }

    window.addEventListener('load', typeEffect);
}


// ================== MOBILE NAVBAR TOGGLE ==================
const navbarToggle = document.querySelector('.navbar-toggle');
const navbar = document.querySelector('.navbar');

if (navbarToggle && navbar) {
    navbarToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
        const icon = navbarToggle.querySelector('i');
        if (navbar.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    navbar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            const icon = navbarToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}


// ================== RESUME TAB FUNCTIONALITY ==================
document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const contentSections = document.querySelectorAll('.content-section');
    const skillFills = document.querySelectorAll('.skill-fill');

    function animateSkillBars() {
        skillFills.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            contentSections.forEach(section => {
                section.classList.remove('active-section');
                if (section.id === targetTab) {
                    section.classList.add('active-section');
                }
            });

            if (targetTab === 'skills') {
                setTimeout(animateSkillBars, 100);
            }
        });
    });

    if (document.querySelector('#skills.active-section')) {
        setTimeout(animateSkillBars, 500);
    }
});


// ================== ENHANCED SCROLL REVEAL WITH 3D ==================
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.about-section, .services-section, .resume-section, .projects-section, .contact, .achievements-section, .skill-tree-section, .documents-section');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // 3D reveal for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    serviceCards.forEach((card, i) => {
        card.classList.add('reveal-3d-up');
        card.style.transitionDelay = `${i * 0.08}s`;
        serviceObserver.observe(card);
    });

    // 3D reveal for project cards
    const projectCards = document.querySelectorAll('.project-card');
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach((card, i) => {
        card.classList.add('reveal-3d');
        card.style.transitionDelay = `${i * 0.12}s`;
        projectObserver.observe(card);
    });

    // 3D reveal for about boxes
    const aboutBoxes = document.querySelectorAll('.about-box');
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.5 });

    aboutBoxes.forEach((box, i) => {
        box.classList.add('reveal-3d-up');
        box.style.transitionDelay = `${i * 0.1}s`;
        aboutObserver.observe(box);
    });

    // 3D reveal for experience items
    const expItems = document.querySelectorAll('.experience-item');
    const expObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    expItems.forEach((item, i) => {
        item.classList.add('reveal-3d-right');
        item.style.transitionDelay = `${i * 0.15}s`;
        expObserver.observe(item);
    });

    // 3D reveal for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    timelineItems.forEach((item, i) => {
        item.classList.add('reveal-3d');
        item.style.transitionDelay = `${i * 0.2}s`;
        timelineObserver.observe(item);
    });

    // 3D reveal for achievement cards
    const achievementCards = document.querySelectorAll('.achievement-card');
    const achievementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    achievementCards.forEach((card, i) => {
        card.classList.add('reveal-3d');
        card.style.transitionDelay = `${i * 0.1}s`;
        achievementObserver.observe(card);
    });

    // 3D reveal for document cards
    const documentCards = document.querySelectorAll('.document-card');
    const isMobile = window.innerWidth <= 768;
    const documentObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    documentCards.forEach((card, i) => {
        card.classList.add('reveal-3d-up');
        card.style.transitionDelay = `${i * (isMobile ? 0.3 : 0.15)}s`;
        documentObserver.observe(card);
    });

    // Testimonial card reveal
    const testimonialCard = document.querySelector('.testimonial-card');
    if (testimonialCard) {
        testimonialCard.classList.add('reveal-3d');
        const tObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('revealed');
            });
        }, { threshold: 0.1 });
        tObserver.observe(testimonialCard);
    }

    // Contact section reveal
    const contactText = document.querySelector('.contact-text');
    const contactForm = document.querySelector('.contact-form');
    if (contactText) {
        contactText.classList.add('reveal-3d');
        const ctObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('revealed');
            });
        }, { threshold: 0.1 });
        ctObserver.observe(contactText);
    }
    if (contactForm) {
        contactForm.classList.add('reveal-3d-right');
        const cfObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('revealed');
            });
        }, { threshold: 0.1 });
        cfObserver.observe(contactForm);
    }

    // Skill cards reveal
    const skillCards = document.querySelectorAll('.skill-card');
    const skillCardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Animate skill bar fill
                const fill = entry.target.querySelector('.skill-bar-fill');
                if (fill) {
                    setTimeout(() => fill.classList.add('animated'), 300);
                }
            }
        });
    }, { threshold: 0.1 });

    skillCards.forEach((card, i) => {
        card.classList.add('reveal-3d-up');
        card.style.transitionDelay = `${i * 0.1}s`;
        skillCardObserver.observe(card);
    });

    // Orb reveal
    const skillOrb = document.querySelector('.skill-orb-container');
    if (skillOrb) {
        skillOrb.classList.add('reveal-3d');
        const orbObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('revealed');
            });
        }, { threshold: 0.1 });
        orbObserver.observe(skillOrb);
    }
});


// ================== STICKY HEADER ==================
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        header.classList.toggle('sticky', window.scrollY > 50);
    }
});


// ================== ACTIVE NAVBAR LINK ON SCROLL ==================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("header nav a[href*='#']");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});


// ================== SMOOTH SCROLL ==================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector(`a[href="${targetId}"]`)?.classList.add('active');

            if (navbar && navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                const icon = navbarToggle?.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });
});


// ================== CONTACT FORM ==================
const contactFormEl = document.getElementById("contactForm");

if (contactFormEl) {
    contactFormEl.addEventListener("submit", async e => {
        e.preventDefault();
        const submitBtn = contactFormEl.querySelector('.submit-btn');
        const statusMessage = document.getElementById('statusMessage');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(contactFormEl);
            const response = await fetch(contactFormEl.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                statusMessage.style.display = 'block';
                statusMessage.className = 'success';
                statusMessage.innerHTML = '<p>Message Sent Successfully! I\'ll get back to you soon.</p>';

                setTimeout(() => {
                    contactFormEl.reset();
                    statusMessage.style.display = 'none';
                }, 5000);
            } else throw new Error('Submission failed');

        } catch (error) {
            statusMessage.style.display = 'block';
            statusMessage.className = 'error';
            statusMessage.innerHTML = '<p>Something went wrong. Please try again or use email directly.</p>';
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}


// ================== CURSOR GLOW ON PROJECT CARDS ==================
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(212, 160, 23, 0.06), var(--card-bg) 60%)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.background = 'var(--card-bg)';
        });
    });
});


// ================== GITHUB STATS COUNTER ANIMATION ==================
document.addEventListener('DOMContentLoaded', () => {
    const statNumbers = document.querySelectorAll('.github-stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                const increment = target / 40;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        el.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        el.textContent = Math.floor(current) + '+';
                    }
                }, 30);
                
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));
});


// ================== FORM INPUT ANIMATIONS ==================
document.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'translateX(5px)';
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'translateX(0)';
        });
    });
});


// ================== MAGNETIC EFFECT ON BUTTONS ==================
(function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn, .submit-btn, .view-project-btn');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-3px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
})();


// ================== TILT ON EXPERIENCE ITEMS ==================
(function initExpTilt() {
    const items = document.querySelectorAll('.experience-item');
    items.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -5;
            const rotateY = (x - centerX) / centerX * 5;
            item.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(8px)`;
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
        });
    });
})();


// ================== TILT ON TIMELINE CONTENT ==================
(function initTimelineTilt() {
    const items = document.querySelectorAll('.timeline-content');
    items.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -4;
            const rotateY = (x - centerX) / centerX * 4;
            item.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
        });
    });
})();
