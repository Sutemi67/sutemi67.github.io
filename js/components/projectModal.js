import { i18n } from '../i18n.js';

const projectsData = {
    'friends-activity': {
        link: 'https://www.rustore.ru/catalog/app/apc.appcradle.kotlinjc_friendsactivity_app',
        screenshots: Array.from({ length: 5 }, (_, i) => `images/project-placeholder-${i + 1}.svg`)
    },
    'working-hours': {
        link: 'https://www.rustore.ru/catalog/app/apc.appcradle.workinghours',
        screenshots: Array.from({ length: 5 }, (_, i) => `images/project-placeholder-${i + 1}.svg`)
    },
    'task-time': {
        link: 'https://www.rustore.ru/catalog/app/apc.appcradle.kotlinjc_pomodorrotimer_app',
        screenshots: Array.from({ length: 5 }, (_, i) => `images/project-placeholder-${i + 1}.svg`)
    },
    'wot-calc': {
        link: 'https://www.rustore.ru/catalog/app/acr.appcradle.wotcalc',
        screenshots: Array.from({ length: 5 }, (_, i) => `images/project-placeholder-${i + 1}.svg`)
    },
    'feeling-diary': {
        link: 'https://www.rustore.ru/catalog/app/apc.appcradle.kotlinjc_feelingdiary_app',
        screenshots: Array.from({ length: 5 }, (_, i) => `images/project-placeholder-${i + 1}.svg`)
    },
    'appcradle-player': {
        link: 'https://www.rustore.ru/catalog/app/apc.appcradle.radioappcradle',
        screenshots: Array.from({ length: 5 }, (_, i) => `images/project-placeholder-${i + 1}.svg`)
    },
    'money-everyday': {
        link: null,
        screenshots: Array.from({ length: 5 }, (_, i) => `images/project-placeholder-${i + 1}.svg`)
    }
};

let modalInitialized = false;

function openModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('projectModalTitle');
    const modalDescription = document.getElementById('projectModalDescription');
    const modalScreenshots = document.getElementById('projectModalScreenshots');
    const modalAction = document.getElementById('projectModalAction');

    const data = projectsData[projectId];
    if (!data || !modal) return;

    const card = document.querySelector(`[data-project="${projectId}"]`);
    const title = card ? card.querySelector('.project-title').textContent : projectId;

    const descKey = 'projects.' + projectId + '.desc';
    modalTitle.textContent = title;
    modalDescription.textContent = i18n.t(descKey) || title;

    modalScreenshots.innerHTML = '';
    data.screenshots.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = title + (i18n.t('project-modal.screenshot') || ' screenshot ') + (index + 1);
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
        a.textContent = i18n.t('project-modal.open-rustore') || 'Open in RuStore';
        modalAction.appendChild(a);
    } else {
        const span = document.createElement('span');
        span.className = 'project-modal-coming-soon';
        span.textContent = i18n.t('project-modal.coming-soon') || 'Coming soon';
        modalAction.appendChild(span);
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

export function setupProjectCards() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;

    if (!modalInitialized) {
        const modalClose = document.getElementById('projectModalClose');

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('open')) {
                e.stopPropagation();
                closeModal();
            }
        });

        modalInitialized = true;
    }

    document.querySelectorAll('.project-row').forEach(row => {
        row.addEventListener('click', (e) => {
            if (e.target.closest('.project-link')) return;
            const card = row.querySelector('.project-card');
            if (card) {
                const projectId = card.getAttribute('data-project');
                if (projectId) openModal(projectId);
            }
        });
    });
}
