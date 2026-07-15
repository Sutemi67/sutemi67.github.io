
const updateTime = () => {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Europe/Moscow'
    };
    const timeElement = document.getElementById('moscowTime');
    if (timeElement) {
        const timeString = now.toLocaleString('ru-RU', options);
        const [date, time] = timeString.split(', ');
        timeElement.innerHTML = `Today: ${date}<br>Now: ${time}`;
    }
};

class Navigation {
    constructor() {
        this.currentSection = 'about';
        this.sections = ['about', 'tech', 'projects', 'sport', 'photography', 'donate'];
        this.sectionTitles = {
            about: 'About',
            tech: 'Tech Stack',
            projects: 'Projects',
            sport: 'Sport',
            photography: 'Photography',
            donate: 'Support'
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showSection(this.currentSection);
        this.updateActiveNavLink();
        this.updatePageTitle();
    }

    updatePageTitle() {
        const sectionTitle = this.sectionTitles[this.currentSection] || this.currentSection;
        const siteName = 'Sergey Boykov';
        document.title = `${sectionTitle} — ${siteName}`;
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
            this.updatePageTitle();
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

// Project data for modal (extend descriptions and replace screenshots later)
const projectsData = {
    'friends-activity': {
        description: 'Step counter with a rating system among your friends. Track your daily activity, compare results with friends, and stay motivated through friendly competition.',
        link: 'https://www.rustore.ru/catalog/app/apc.appcradle.kotlinjc_friendsactivity_app',
        screenshots: Array.from({ length: 5 }, (_, i) => `images/project-placeholder-${i + 1}.svg`)
    },
    'working-hours': {
        description: 'The application allows you to set shift schedules with a specified frequency and calculate payment for them. Configure different shift types, track worked hours, and generate payment reports.',
        link: 'https://www.rustore.ru/catalog/app/apc.appcradle.workinghours',
        screenshots: Array.from({ length: 5 }, (_, i) => `images/project-placeholder-${i + 1}.svg`)
    },
    'task-time': {
        description: 'This simple yet effective timer will help you focus on your work during your busy period, and will also remind you to take a break. The built-in task list will help you keep your focus on the most important things. Customize focus and break intervals to match your workflow.',
        link: 'https://www.rustore.ru/catalog/app/apc.appcradle.kotlinjc_pomodorrotimer_app',
        screenshots: Array.from({ length: 5 }, (_, i) => `images/project-placeholder-${i + 1}.svg`)
    },
    'wot-calc': {
        description: 'This application helps to determine the characteristics of your tank with different equipment setups. Automatic recalculation of characteristics with new data. Compare different configurations and find the optimal setup for your playstyle.',
        link: 'https://www.rustore.ru/catalog/app/acr.appcradle.wotcalc',
        screenshots: Array.from({ length: 5 }, (_, i) => `images/project-placeholder-${i + 1}.svg`)
    },
    'feeling-diary': {
        description: 'This app allows you to write down all the feelings that you are experiencing at the moment and would like to write down. Keep a daily journal of your emotions, track mood patterns over time, and gain insights into your emotional wellbeing.',
        link: 'https://www.rustore.ru/catalog/app/apc.appcradle.kotlinjc_feelingdiary_app',
        screenshots: Array.from({ length: 5 }, (_, i) => `images/project-placeholder-${i + 1}.svg`)
    },
    'appcradle-player': {
        description: 'Player for listening your own local tracks on the device. Create playlists, organize your music library, and enjoy high-quality audio playback with a clean, intuitive interface.',
        link: 'https://www.rustore.ru/catalog/app/apc.appcradle.radioappcradle',
        screenshots: Array.from({ length: 5 }, (_, i) => `images/project-placeholder-${i + 1}.svg`)
    },
    'money-everyday': {
        description: 'Your expenses on the screen. Without effort. An application for automatic accounting of personal finances and control of expenses using incoming notifications. Track spending categories, set budgets, and visualize your financial habits.',
        link: null,
        screenshots: Array.from({ length: 5 }, (_, i) => `images/project-placeholder-${i + 1}.svg`)
    }
};

// Setup project cards modal
const setupProjectCards = () => {
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('projectModalClose');
    const modalTitle = document.getElementById('projectModalTitle');
    const modalDescription = document.getElementById('projectModalDescription');
    const modalScreenshots = document.getElementById('projectModalScreenshots');
    const modalAction = document.getElementById('projectModalAction');

    if (!modal) return;

    const openModal = (projectId) => {
        const data = projectsData[projectId];
        if (!data) return;

        const card = document.querySelector(`[data-project="${projectId}"]`);
        const title = card ? card.querySelector('.project-title').textContent : projectId;

        modalTitle.textContent = title;
        modalDescription.textContent = data.description;

        modalScreenshots.innerHTML = '';
        data.screenshots.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `${title} screenshot ${index + 1}`;
            img.loading = 'lazy';
            modalScreenshots.appendChild(img);
        });

        modalAction.innerHTML = '';
        if (data.link) {
            const a = document.createElement('a');
            a.href = data.link;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.className = 'project-modal-open-link';
            a.textContent = 'Open in RuStore';
            modalAction.appendChild(a);
        } else {
            const span = document.createElement('span');
            span.className = 'project-modal-coming-soon';
            span.textContent = 'Coming soon';
            modalAction.appendChild(span);
        }

        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    };

    // Card click → open modal
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.project-link')) return;
            const projectId = card.getAttribute('data-project');
            if (projectId) openModal(projectId);
        });
    });

    // Close button
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Click outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            e.stopPropagation();
            closeModal();
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
};

