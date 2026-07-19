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

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.project-link')) return;
            const projectId = card.getAttribute('data-project');
            if (projectId) openModal(projectId);
        });
    });
}
