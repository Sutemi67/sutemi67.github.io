import { i18n } from '../i18n.js';
import { libraryData } from './libraryData.js';

export class LibraryManager {
    constructor() {
        this.currentPath = null;
        this.buildNavTree();
        this.setupLangChange();
    }

    setupLangChange() {
        document.addEventListener('langchange', () => {
            this.buildNavTree();
            if (this.currentPath) {
                this.navigateTo(this.currentPath);
            } else {
                this.showWelcome();
            }
        });
    }

    buildNavTree() {
        const container = document.getElementById('libraryNavTree');
        if (!container) return;

        container.innerHTML = '';

        for (const [, section] of Object.entries(libraryData)) {
            const sectionEl = document.createElement('div');
            sectionEl.className = 'lib-nav-section';

            const sectionHeader = document.createElement('div');
            sectionHeader.className = 'lib-nav-section-header';
            const sectionTitle = i18n.t(section.titleKey) || section.titleKey;
            sectionHeader.innerHTML = `<span class="lib-arrow">▶</span> ${sectionTitle}`;
            sectionHeader.addEventListener('click', () => {
                sectionHeader.classList.toggle('open');
                const groups = sectionHeader.nextElementSibling;
                groups.classList.toggle('open');
                const arrow = sectionHeader.querySelector('.lib-arrow');
                arrow.classList.toggle('open');
                const firstItem = Object.values(section.groups)[0]?.items[0];
                if (firstItem) this.navigateTo(firstItem.path);
            });

            const groupsContainer = document.createElement('div');
            groupsContainer.className = 'lib-nav-groups open';

            for (const [, group] of Object.entries(section.groups)) {
                const groupEl = document.createElement('div');
                groupEl.className = 'lib-nav-group';

                const groupHeader = document.createElement('div');
                groupHeader.className = 'lib-nav-group-header';
                const groupTitle = i18n.t(group.titleKey) || group.titleKey;
                groupHeader.innerHTML = `<span class="lib-arrow">▶</span> ${groupTitle} <span class="lib-count">(${group.items.length})</span>`;
                groupHeader.addEventListener('click', (e) => {
                    e.stopPropagation();
                    groupHeader.classList.toggle('open');
                    const items = groupHeader.nextElementSibling;
                    items.classList.toggle('open');
                    const arrow = groupHeader.querySelector('.lib-arrow');
                    arrow.classList.toggle('open');
                    const first = group.items[0];
                    if (first) this.navigateTo(first.path);
                });

                const items = document.createElement('ul');
                items.className = 'lib-nav-items open';

                group.items.forEach(item => {
                    const li = document.createElement('li');
                    li.className = 'lib-nav-item';
                    li.dataset.path = item.path;
                    const a = document.createElement('a');
                    a.href = '#';
                    a.textContent = item.num ? `${item.num}. ${item.name}` : item.name;
                    a.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.navigateTo(item.path);
                    });
                    li.appendChild(a);
                    items.appendChild(li);
                });

                groupEl.appendChild(groupHeader);
                groupEl.appendChild(items);
                groupsContainer.appendChild(groupEl);
            }

            sectionEl.appendChild(sectionHeader);
            sectionEl.appendChild(groupsContainer);
            container.appendChild(sectionEl);
        }
    }

    navigateTo(path) {
        if (!path) return;

        this.currentPath = path;
        const content = document.getElementById('libraryContent');
        if (!content) return;

        document.querySelectorAll('.lib-nav-item a').forEach(a => a.classList.remove('active'));
        const activeLink = document.querySelector(`.lib-nav-item[data-path="${path}"] a`);
        if (activeLink) activeLink.classList.add('active');

        const fullPath = `pages/library/${path}.html`;
        content.innerHTML = `<div class="library-loading" data-i18n="library.loading">Loading...</div>`;
        i18n.applyToElement(content);

        fetch(fullPath)
            .then(response => {
                if (!response.ok) throw new Error('Not found');
                return response.text();
            })
            .then(html => {
                content.innerHTML = html;
                i18n.applyToElement(content);
                if (typeof hljs !== 'undefined') {
                    content.querySelectorAll('pre code').forEach(block => {
                        hljs.highlightElement(block);
                    });
                }
                this.setupContentClicks(content);
            })
            .catch(() => {
                content.innerHTML = `
                    <div class="library-welcome">
                        <h2>404</h2>
                        <p class="lead" data-i18n="library.not-found">Страница не найдена</p>
                        <a href="#" class="lib-home-link" id="libHomeLink" data-i18n="library.home">На главную</a>
                    </div>
                `;
                i18n.applyToElement(content);
                const homeLink = document.getElementById('libHomeLink');
                if (homeLink) {
                    homeLink.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.showWelcome();
                    });
                }
            });
    }

    showWelcome() {
        this.currentPath = null;
        const content = document.getElementById('libraryContent');
        if (!content) return;

        document.querySelectorAll('.lib-nav-item a').forEach(a => a.classList.remove('active'));

        content.innerHTML = `
            <div class="library-welcome">
                <h2 data-i18n="library.welcome.title">Design Patterns & Architecture</h2>
                <p class="lead" data-i18n="library.welcome.subtitle">GoF паттерны проектирования и принципы архитектуры приложений с примерами на Dart</p>
                <div class="library-welcome-cards">
                    <div class="library-welcome-card" data-nav-path="patterns/creational/01-factory-method">
                        <h3 data-i18n="library.welcome.patterns.title">Паттерны проектирования</h3>
                        <p data-i18n="library.welcome.patterns.desc">23 классических паттерна GoF с примерами на Dart</p>
                    </div>
                    <div class="library-welcome-card" data-nav-path="architecture/solid/01-single-responsibility">
                        <h3 data-i18n="library.welcome.architecture.title">Архитектура приложений</h3>
                        <p data-i18n="library.welcome.architecture.desc">Принципы SOLID, Clean Architecture, CQRS, DI, DDD</p>
                    </div>
                </div>
            </div>
        `;

        i18n.applyToElement(content);

        content.querySelectorAll('.library-welcome-card').forEach(card => {
            card.addEventListener('click', () => {
                const path = card.dataset.navPath;
                if (path) this.navigateTo(path);
            });
        });
    }

    setupContentClicks(container) {
        const homeLink = container.querySelector('a[data-nav="home"]');
        if (homeLink) {
            homeLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showWelcome();
            });
        }

        container.querySelectorAll('a[data-nav="item"], a[data-nav="pattern"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const path = link.dataset.path;
                if (path) this.navigateTo(path);
            });
        });

        container.querySelectorAll('a[data-nav="group"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const groupKey = link.dataset.group;
                for (const [, section] of Object.entries(libraryData)) {
                    for (const [gk, group] of Object.entries(section.groups)) {
                        if (gk === groupKey || group.title === groupKey) {
                            const first = group.items[0];
                            if (first) this.navigateTo(first.path);
                            return;
                        }
                    }
                }
            });
        });

        container.querySelectorAll('.library-welcome-card').forEach(card => {
            card.addEventListener('click', () => {
                const path = card.dataset.navPath;
                if (path) this.navigateTo(path);
            });
        });
    }
}
