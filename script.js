// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize
    initPreloader();
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    initActiveNav();
    initRoleRotator();
    initCounters();
    initSkillAnimations();
    initProjectModals();
    initContactForm();
    initBackToTop();
    initObservers();
    initReducedMotion();
});

// Preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 800);
    });
}

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    // Check for saved theme or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-mode');
    } else if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
    }

    themeToggle.addEventListener('click', () => {
        const isDark = !body.classList.contains('dark-mode');
        body.classList.toggle('dark-mode');
        
        if (isDark) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileMenu = document.querySelector('.mobile-nav');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileCloseBtn = document.querySelector('.mobile-close-btn');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    hamburgerBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    mobileCloseBtn.addEventListener('click', closeMobileMenu);
    mobileOverlay.addEventListener('click', closeMobileMenu);
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Active Navigation
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    function updateActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call
}

// Role Rotator
function initRoleRotator() {
    const roles = document.querySelectorAll('.role');
    if (roles.length === 0) return;

    let currentRoleIndex = 0;
    let isAnimating = false;

    function rotateRole() {
        if (isAnimating) return;
        isAnimating = true;

        const currentRole = roles[currentRoleIndex];
        const nextRoleIndex = (currentRoleIndex + 1) % roles.length;
        const nextRole = roles[nextRoleIndex];

        // Fade out current
        currentRole.style.opacity = '0';
        currentRole.style.transform = 'translateY(20px)';

        setTimeout(() => {
            currentRole.classList.remove('active');
            nextRole.classList.add('active');
            nextRole.style.opacity = '1';
            nextRole.style.transform = 'translateY(0)';
            
            currentRoleIndex = nextRoleIndex;
            isAnimating = false;
        }, 500);
    }

    // Start rotation after 3 seconds
    setTimeout(() => {
        setInterval(rotateRole, 3000);
    }, 3000);
}

// Animated Counters
function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element, target) {
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toFixed(target % 1 !== 0 ? 2 : 0);
                clearInterval(timer);
            } else {
                element.textContent = current.toFixed(target % 1 !== 0 ? 2 : 0);
            }
        }, 16);
    }

    function animateNumbers() {
        statNumbers.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-target'));
            animateCounter(stat, target);
        });
    }

    // Store the function for use with Intersection Observer
    window.animateNumbers = animateNumbers;
}

// Skill Animations
function initSkillAnimations() {
    const skillPills = document.querySelectorAll('.skill-pill');
    
    function animateSkills() {
        skillPills.forEach(pill => {
            const level = pill.getAttribute('data-level');
            const levelBar = pill.querySelector('.level-bar');
            if (levelBar) {
                setTimeout(() => {
                    levelBar.style.width = `${level}%`;
                }, 300);
            }
        });
    }

    // Store the function for use with Intersection Observer
    window.animateSkills = animateSkills;
}

// Project Modals
function initProjectModals() {
    const projectBtns = document.querySelectorAll('.project-view-btn');
    const modalOverlay = document.getElementById('modalOverlay');
    const modals = document.querySelectorAll('.project-modal');
    const closeModalBtns = document.querySelectorAll('.modal-close');

    projectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            const modal = document.getElementById(`projectModal${projectId}`);
            
            if (modal) {
                modal.classList.add('active');
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeAllModals() {
        modals.forEach(modal => modal.classList.remove('active'));
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    modalOverlay.addEventListener('click', closeAllModals);

    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('successToast');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        // Reset previous error states
        contactForm.querySelectorAll('.error').forEach(el => el.remove());
        
        // Name validation
        if (!name) {
            showError('name', 'Please enter your name');
            isValid = false;
        }
        
        // Email validation
        if (!email) {
            showError('email', 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Subject validation
        if (!subject) {
            showError('subject', 'Please enter a subject');
            isValid = false;
        }
        
        // Message validation
        if (!message) {
            showError('message', 'Please enter your message');
            isValid = false;
        } else if (message.length < 10) {
            showError('message', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Show success toast
        showToast();
        
        // Reset form
        contactForm.reset();
        
        // In production, you would send the data to a server here
        console.log('Form submitted:', { name, email, subject, message });
    });

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const error = document.createElement('div');
        error.className = 'error';
        error.style.color = '#ef4444';
        error.style.fontSize = '0.75rem';
        error.style.marginTop = '0.25rem';
        error.textContent = message;
        field.parentNode.appendChild(error);
        field.style.borderColor = '#ef4444';
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showToast() {
        toast.classList.add('active');
        
        setTimeout(() => {
            toast.classList.remove('active');
        }, 4000);
    }
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');

    if (!backToTopBtn) return;

    function updateButtonVisibility() {
        if (window.scrollY > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    }

    window.addEventListener('scroll', updateButtonVisibility);
    updateButtonVisibility(); // Initial call

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Intersection Observer for Animations
function initObservers() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                switch(sectionId) {
                    case 'home':
                        if (!window.statsAnimated && window.animateNumbers) {
                            window.animateNumbers();
                            window.statsAnimated = true;
                        }
                        break;
                    case 'skills':
                        if (!window.skillsAnimated && window.animateSkills) {
                            window.animateSkills();
                            window.skillsAnimated = true;
                        }
                        break;
                }
                
                // Add fade-up animation to elements
                const animatables = entry.target.querySelectorAll(
                    '.skill-pill, .tool-card, .timeline-item, .education-card, .activity-card, .project-card'
                );
                
                animatables.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.animation = 'fadeUp 0.6s ease forwards';
                        el.style.opacity = '1';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => observer.observe(section));
}

// Reduced Motion Support
function initReducedMotion() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    function handleReducedMotion(e) {
        if (e.matches) {
            document.body.classList.add('reduced-motion');
        } else {
            document.body.classList.remove('reduced-motion');
        }
    }

    // Initial check
    handleReducedMotion(mediaQuery);
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleReducedMotion);
}