// Time update functionality
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
        timeElement.textContent = `Current time: ${now.toLocaleString('ru-RU', options)}`;
    }
};



// Spoiler functionality
const toggleSpoiler = (spoilerId) => {
    const content = document.getElementById(spoilerId);
    const arrow = content?.previousElementSibling?.querySelector('.arrow');
    
    if (content && arrow) {
        content.classList.toggle('active');
        arrow.classList.toggle('active');
        
        // Update ARIA attributes
        const isExpanded = content.classList.contains('active');
        content.setAttribute('aria-expanded', isExpanded);
        content.setAttribute('aria-hidden', !isExpanded);
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateTime();
    setInterval(updateTime, 1000);
}); 