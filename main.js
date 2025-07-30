
const updateTime = () => {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    const timeElement = document.getElementById('serverTime');
    if (timeElement) {
        const timeString = now.toLocaleString('ru-RU', options);
        const [date, time] = timeString.split(', ');
        timeElement.innerHTML = `Today: ${date} <br>Now: ${time}`;
    }
};

class Navigation {
    constructor() {
        this.currentSection = 'about';
        this.sections = ['about', 'tech', 'projects', 'sport', 'photography', 'donate'];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showSection(this.currentSection);
        this.updateActiveNavLink();
    }

    setupEventListeners() {
        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.navigateToSection(section);
            });
        });

        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');

        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        if (overlay) {
            overlay.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                this.closeMobileMenu();
            }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }
        });
    }

    navigateToSection(sectionName) {
        if (this.sections.includes(sectionName)) {
            this.currentSection = sectionName;
            this.showSection(sectionName);
            this.updateActiveNavLink();
            this.closeMobileMenu();
            
            // Update URL hash
            history.pushState(null, null, `#${sectionName}`);
        }
    }

    showSection(sectionName) {
        // Hide all sections
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }

    updateActiveNavLink() {
        // Remove active class from all nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current section link
        const activeLink = document.querySelector(`[data-section="${this.currentSection}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    toggleMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');

        if (sidebar && overlay) {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
            
            // Update toggle button
            if (mobileMenuToggle) {
                const isOpen = sidebar.classList.contains('active');
                mobileMenuToggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
            }
        }
    }

    closeMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');

        if (sidebar && overlay) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            
            if (mobileMenuToggle) {
                mobileMenuToggle.setAttribute('aria-label', 'Открыть меню');
            }
        }
    }
}

// Smooth scrolling for anchor links
const setupSmoothScrolling = () => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// Add loading animations
const setupAnimations = () => {
    // Intersection Observer for fade-in animations
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

    // Observe content cards and new elements
    const animatedElements = document.querySelectorAll('.content-card, .project-card, .tech-item, .sport-item, .photo-item, .achievement-card, .equipment-card, .smart-gallery-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
};

// Add hover effects for interactive elements
const setupHoverEffects = () => {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.contact-button, .project-link:not(.disabled)');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            button.style.setProperty('--ripple-x', `${x}px`);
            button.style.setProperty('--ripple-y', `${y}px`);
        });
    });

    // Add special hover effects for sport and photo items
    const sportItems = document.querySelectorAll('.sport-item');
    const photoItems = document.querySelectorAll('.photo-item');
    
    sportItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(4px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });

    photoItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(4px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });
};

// Add section-specific animations
const setupSectionAnimations = () => {
    // Different animation delays for different sections
    const sectionAnimations = {
        'sport': {
            elements: '.sport-item',
            delay: 100
        },
        'photography': {
            elements: '.photo-item, .equipment-card',
            delay: 150
        },
        'tech': {
            elements: '.tech-item',
            delay: 120
        }
    };

    Object.entries(sectionAnimations).forEach(([section, config]) => {
        const elements = document.querySelectorAll(config.elements);
        elements.forEach((element, index) => {
            element.style.transitionDelay = `${index * config.delay}ms`;
        });
    });
};

// ====== Сертификаты: модальное окно увеличенного просмотра ======
function setupCertificateModal() {
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('certificateModalImg');
    const modalClose = document.getElementById('certificateModalClose');
    const images = document.querySelectorAll('.cert-img');

    if (!modal || !modalImg || !modalClose) return;

    images.forEach(img => {
        img.addEventListener('click', () => {
            modal.classList.add('open');
            modalImg.src = img.src;
            modalImg.alt = img.alt;
        });
        img.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                modal.classList.add('open');
                modalImg.src = img.src;
                modalImg.alt = img.alt;
            }
        });
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('open');
        modalImg.src = '';
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('open');
            modalImg.src = '';
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            modal.classList.remove('open');
            modalImg.src = '';
        }
    });
}


// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize time
    updateTime();
    setInterval(updateTime, 1000);

    // Initialize navigation
    const navigation = new Navigation();

    // Setup additional features
    setupSmoothScrolling();
    setupAnimations();
    setupHoverEffects();
    setupSectionAnimations();
    setupProjectCards();
    optimizePerformance();
    setupCertificateModal(); // <--- добавляем инициализацию модального окна сертификатов

    // Handle initial hash in URL
    const hash = window.location.hash.substring(1);
    if (hash && navigation.sections.includes(hash)) {
        navigation.navigateToSection(hash);
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.substring(1);
        if (hash && navigation.sections.includes(hash)) {
            navigation.navigateToSection(hash);
        } else {
            navigation.navigateToSection('about');
        }
    });
});

// Setup interactive project cards
const setupProjectCards = () => {
    const projectCards = document.querySelectorAll('.project-card');
    let expandedCard = null;

    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't expand if clicking on links
            if (e.target.closest('.project-link')) {
                return;
            }

            // If clicking on the same card, collapse it
            if (card === expandedCard) {
                card.classList.remove('expanded');
                expandedCard = null;
                return;
            }

            // Collapse previously expanded card
            if (expandedCard) {
                expandedCard.classList.remove('expanded');
            }

            // Expand clicked card
            card.classList.add('expanded');
            expandedCard = card;

            // Scroll to expanded card if needed
            setTimeout(() => {
                card.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest',
                    inline: 'nearest'
                });
            }, 400);
        });
    });

    // Collapse expanded card when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.project-card') && expandedCard) {
            expandedCard.classList.remove('expanded');
            expandedCard = null;
        }
    });

    // Collapse on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && expandedCard) {
            expandedCard.classList.remove('expanded');
            expandedCard = null;
        }
    });
};

// Add some performance optimizations
const optimizePerformance = () => {
    // Preload critical images
    const criticalImages = ['favicon.jpg'];
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });

    // Lazy load non-critical images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
};

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

 