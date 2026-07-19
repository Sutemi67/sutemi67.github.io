export class Navigation {
    constructor(options = {}) {
        this.currentSection = 'about';
        this.sections = ['about', 'tech', 'projects', 'sport', 'photography', 'donate', 'library'];
        this.sectionTitles = {
            about: 'About',
            tech: 'Tech Stack',
            projects: 'Projects',
            sport: 'Sport',
            photography: 'Photography',
            donate: 'Support',
            library: 'Library'
        };
        this.sectionCache = {};
        this.afterLoad = options.afterLoad || {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showSection(this.currentSection);
        this.updateActiveNavLink();
        this.updatePageTitle();
        this.loadSectionContent(this.currentSection);
    }

    setupEventListeners() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.navigateToSection(section);
            });
        });

        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
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

        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                this.closeMobileMenu();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }
        });
    }

    async loadSectionContent(sectionName) {
        if (this.sectionCache[sectionName]) return;
        try {
            const response = await fetch(`pages/${sectionName}.html`);
            if (response.ok) {
                this.sectionCache[sectionName] = await response.text();
                if (this.currentSection === sectionName) {
                    const target = document.getElementById(sectionName);
                    if (target) {
                        target.innerHTML = this.sectionCache[sectionName];
                        this.runAfterLoad(sectionName);
                    }
                }
            }
        } catch (e) {}
    }

    runAfterLoad(sectionName) {
        const cb = this.afterLoad[sectionName];
        if (cb) cb();
    }

    navigateToSection(sectionName) {
        if (this.sections.includes(sectionName)) {
            this.currentSection = sectionName;
            this.showSection(sectionName);
            this.updateActiveNavLink();
            this.updatePageTitle();
            this.closeMobileMenu();

            history.pushState(null, null, `#${sectionName}`);

            this.toggleLibraryNav(sectionName === 'library');

            this.loadSectionContent(sectionName);
        }
    }

    showSection(sectionName) {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            if (this.sectionCache[sectionName]) {
                targetSection.innerHTML = this.sectionCache[sectionName];
                this.runAfterLoad(sectionName);
            }
            targetSection.classList.add('active');
        }
    }

    updateActiveNavLink() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        const activeLink = document.querySelector(`[data-section="${this.currentSection}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    updatePageTitle() {
        const sectionTitle = this.sectionTitles[this.currentSection] || this.currentSection;
        const siteName = 'Sergey Boykov';
        document.title = `${sectionTitle} — ${siteName}`;
    }

    toggleLibraryNav(show) {
        const navItem = document.getElementById('navLibrary');
        if (!navItem) return;
        navItem.classList.toggle('library-expanded', show);
        const arrow = navItem.querySelector('.library-toggle-arrow');
        if (arrow) arrow.classList.toggle('open', show);
    }

    toggleMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');

        if (sidebar && overlay) {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');

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
