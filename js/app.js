import { Navigation } from './router.js';
import { LibraryManager } from './library/LibraryManager.js';
import { setupProjectCards } from './components/projectModal.js';
import { setupCertificateModal } from './components/certificateModal.js';
import { initClock } from './components/clock.js';
import { setupSmoothScrolling } from './utils/smoothScroll.js';
import { optimizePerformance } from './utils/performance.js';

const library = new LibraryManager();

document.addEventListener('DOMContentLoaded', () => {
    initClock();

    const navigation = new Navigation({
        afterLoad: {
            projects: setupProjectCards,
            sport: setupCertificateModal,
            library: () => {
                if (library.currentPath) {
                    library.navigateTo(library.currentPath);
                } else {
                    library.showWelcome();
                }
            }
        }
    });

    const hash = window.location.hash.substring(1);
    if (hash && navigation.sections.includes(hash)) {
        navigation.navigateToSection(hash);
    }

    window.addEventListener('popstate', () => {
        const hash = window.location.hash.substring(1);
        if (hash && navigation.sections.includes(hash)) {
            navigation.navigateToSection(hash);
        } else {
            navigation.navigateToSection('about');
        }
    });

    setupSmoothScrolling();
    optimizePerformance();
});
