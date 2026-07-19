let modalInitialized = false;

export function setupCertificateModal() {
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('certificateModalImg');
    const modalClose = document.getElementById('certificateModalClose');

    if (!modal || !modalImg || !modalClose) return;

    if (!modalInitialized) {
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

        modalInitialized = true;
    }

    document.querySelectorAll('.cert-img').forEach(img => {
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
}
