import { i18n } from '../i18n.js';

export function initClock() {
    const updateTime = () => {
        const now = new Date();
        const locale = i18n.lang === 'ru' ? 'ru-RU' : 'en-US';
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
            const timeString = now.toLocaleString(locale, options);
            const [date, time] = timeString.split(', ');
            const todayLabel = i18n.t('clock.today') || 'Today:';
            const nowLabel = i18n.t('clock.now') || 'Now:';
            timeElement.innerHTML = `${todayLabel} ${date}<br>${nowLabel} ${time}`;
        }
    };

    updateTime();
    setInterval(updateTime, 1000);

    document.addEventListener('langchange', updateTime);
}
