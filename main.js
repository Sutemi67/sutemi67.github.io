/**
 * Обновляет время в сайдбаре
 * @function updateTime
 */
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
        timeElement.innerHTML = `Сегодня: ${date} <br>Сейчас: ${time}`;
    }
};

/**
 * Класс для управления навигацией сайта
 * @class Navigation
 */
class Navigation {
    /**
     * @constructor
     */
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

// Smart Gallery functionality
const setupSmartGallery = () => {
    const galleryContainer = document.getElementById('smartGallery');
    if (!galleryContainer) return;

    // Массив ссылок на фотографии с разными пропорциями для masonry layout
    const photos = [
        'https://lh4.googleusercontent.com/zxzlryQpgrIbza1K-NaasVtG-tY4EQVyDVp3dze6D0rcFRM1-WgPxY2bLi_-XjNR10URGZh4ERVFtsiZ7Jajp5RMTDXv7z7OvgYzWMxw59LaUx0WB0P0z3QbwGf_ZZxONiuAdIoclEfxx_paVwdk1G-ZUOlu7J6vur1ofD6di3oAIk8MhGqCuA=w1280',
        'https://lh5.googleusercontent.com/LXApM-oid6O0yZ3DnqSqhwQZZn9gocBzlVBLUzmE0Xl2Q0SXlyGoR8QrDrNWwB2YEcBcOrdk08cPriuMH0HSArjUi_hbiHynANIMEBRqH3v2_F9AoKgzS0CehQYZ2qVWnu0rYZZYoqgfk4rlhopbt3fV7P23ElkO7uYWhzw05j-0VWrSC3Ythg=w1280',
        'https://lh3.googleusercontent.com/8XKisVpfD0lOuMZBntsF2zQDuhJrH8jf7R3LJSn9EyvVoqrAV3XPTnMYkCeD7SUgdX0L_1WnkjG5eDYqoZFBsU3RwbOCbEplxMEGRtNE9g1TqAhY3RJSRHXOPcE4Ya-PSK999KIJu-H7YQ6IEoRcb029fjfdTDEDP0avZVBYXdcWDtbG2PXw6w=w1280',
        'https://lh4.googleusercontent.com/bFoxTeVktstQJxtvKM_zeDtdHmClRPNStfpZadij8TMUePlNMjv9ESKIQsZyi_4mSeUQbiJHue9E0MLvlY2ix7URA7WQrOVMVmwDbmd811gPqEOphhE68s3ZqXwkt4AT_Z1DeB0L9U1rrRu7TCHrUj5QV0xwN4UTLUiY-pzRRKNgnjzacVU2gg=w1280',
        'https://lh4.googleusercontent.com/-Ooe7Yjxj4GFk8zshOxxrOUqGCEQqHyz-A1fNlqnaKmc-nJnIbfT59aheUoVo2yWIscXtN2sx_PvWIwJ59k_DofBxkIkii-eeXNtLoNwB2j-b38k3yfRc904aaJ7B73s8lIWF_kn7ALM5xRop27qm3jnCbhjmKR0eJVMbdTi8k5J1GVBQzcByQ=w1280',
        'https://lh6.googleusercontent.com/gPyQkjRHiN_zEvUvvNIOFScjeo_4VdyKGujM8g15MAPSixHh7uCIMWGX-O0cJbzmatKVsejWW3GUTFMzVD9AldBIs2qbpqXu50XXZUV8fDVP9VKcuAUhf8FEPfMZN7uUArrgT5Yga_yoNwO42rzQHg_DMVeT-exWFLKIDMrTo8txlaWOHdzrXQ=w1280',
        'https://lh4.googleusercontent.com/1E6HYQDvoKk1puv9Sp7OrK3ZGE0XckQ_1ZUWcCd11emEOeaoFE5aOsCSzih354cbTHxX66s4PZo1FCd4EGSVRbQDE5s9CYobRySoQs1A0xehp4XS_-6f_mTKKGM5xSMFwDVdKZKu-bv7XoaFqBrFXNm5U7ERWYxPmsV7LKFTCXL0zKPTIGek4g=w1280',
        'https://lh6.googleusercontent.com/L69OrNK0fI5hUnM_un9Vwpwn8OLEVlPopWVfoF7-pAbC95Brkx-sThTQG071XDbBNI57nronMBuAyjqeK3DqDuuafrRjM_JHI-ymNBanccex_xNCp3EByevxSSV7i-4rCF7YlC5A8w1Muk9YSebvHmwIRSdl0Aey1RB_6oKPRBXfeAxRaIVNQQ=w1280',
        'https://lh5.googleusercontent.com/JIeuSSgy5l7lBhc3ow8woyycjPlNLvXFdFK7Hdb6UN-Ce5ZXKAZ1jX9jKgYIVnzoWCwl_LrXUKjK9sw5t6gvs1jB15eb1oZbLUJEXzGIRQr_vH0R3aC_iI-1vx3xW8IE5qljIOigdSo2JOIo8bvgwOBIjNJxem4xQpdMvxzON2vKTLYHHEMfHg=w1280',
        'https://lh5.googleusercontent.com/qh91FjcvE_lEvCWq4INdRKmeQ1chFg7dMh5AmzV4nhREQBbgnZIxKPqWDYyH0x01PgT80SXABKceK6-bTIK2ElVDP3i8uq7PO5QuAiKtnm0W2Mni8Uw5bCU3zXgU2zKPZ5unQA0vDuTg3asl7ir_Ll_2-zHbFN0EQPyJROCq3zrH4qqVVM4gWA=w1280',

    ];

    // Создаем элементы галереи
    photos.forEach(photoUrl => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'smart-gallery-item';
        
        galleryItem.innerHTML = `
            <img src="${photoUrl}" alt="Фотография" class="smart-gallery-image" loading="lazy">
        `;

        galleryContainer.appendChild(galleryItem);
    });

    // Оптимизация masonry layout после загрузки изображений
    const images = galleryContainer.querySelectorAll('.smart-gallery-image');
    let loadedImages = 0;
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            loadedImages++;
            if (loadedImages === images.length) {
                // Все изображения загружены, можно применить дополнительные оптимизации
                optimizeMasonryLayout(galleryContainer);
            }
        });
        
        img.addEventListener('error', () => {
            loadedImages++;
            if (loadedImages === images.length) {
                optimizeMasonryLayout(galleryContainer);
            }
        });
    });
};

// Функция для оптимизации masonry layout
const optimizeMasonryLayout = (container) => {
    // Добавляем небольшую задержку для стабилизации layout
    setTimeout(() => {
        const items = container.querySelectorAll('.smart-gallery-item');
        items.forEach(item => {
            // Добавляем плавную анимацию появления
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, Math.random() * 300); // Случайная задержка для эффекта каскада
        });
    }, 100);
};

// Инициализация умной галереи
document.addEventListener('DOMContentLoaded', setupSmartGallery); 