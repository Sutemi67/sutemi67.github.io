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

// Visitor statistics functionality
const updateVisitorStats = async () => {
    const onlineUsersElement = document.getElementById('onlineUsers');
    const monthlyUsersElement = document.getElementById('monthlyUsers');
    
    try {
        const response = await fetch('/api/stats/visitors');
        if (!response.ok) throw new Error('Failed to fetch visitor stats');
        
        const data = await response.json();
        
        if (onlineUsersElement) {
            onlineUsersElement.textContent = data.onlineUsers.toLocaleString();
        }
        if (monthlyUsersElement) {
            monthlyUsersElement.textContent = data.monthlyUsers.toLocaleString();
        }
    } catch (error) {
        console.error('Error fetching visitor stats:', error);
        if (onlineUsersElement) {
            onlineUsersElement.textContent = '0';
        }
        if (monthlyUsersElement) {
            monthlyUsersElement.textContent = '0';
        }
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
    
    // Update visitor stats immediately and then every 30 seconds
    updateVisitorStats();
    setInterval(updateVisitorStats, 30000);
}); 