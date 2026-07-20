export class I18n {
    constructor() {
        this.lang = localStorage.getItem('lang') || 'en';
        this.translations = {};
    }

    async init() {
        await this.loadLocale(this.lang);
        document.documentElement.lang = this.lang;
        this.applyToDocument();
        document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: this.lang } }));
    }

    async loadLocale(lang) {
        try {
            const res = await fetch(`locales/${lang}.json`);
            if (res.ok) {
                this.translations = await res.json();
            } else {
                this.translations = {};
            }
        } catch (e) {
            this.translations = {};
        }
    }

    t(key) {
        return this.translations[key];
    }

    async switchLang(lang) {
        if (lang === this.lang) return;
        this.lang = lang;
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang;
        await this.loadLocale(lang);
        this.applyToDocument();
        document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
    }

    applyToElement(element) {
        if (!element) return;

        element.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.t(key);
            if (translation !== undefined && translation !== null) {
                if (el.hasAttribute('data-i18n-html')) {
                    el.innerHTML = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });

        element.querySelectorAll('[data-i18n-attr]').forEach(el => {
            const raw = el.getAttribute('data-i18n-attr');
            if (!raw) return;
            raw.split(';').forEach(pair => {
                const trimmed = pair.trim();
                if (!trimmed) return;
                const sepIdx = trimmed.indexOf(':');
                if (sepIdx === -1) return;
                const attrName = trimmed.slice(0, sepIdx).trim();
                const key = trimmed.slice(sepIdx + 1).trim();
                const translation = this.t(key);
                if (translation !== undefined && translation !== null) {
                    el.setAttribute(attrName, translation);
                }
            });
        });
    }

    applyToDocument() {
        this.applyToElement(document);
        this.updateLangSwitcher();
        this.updateMeta();
    }

    updateLangSwitcher() {
        const switcher = document.querySelector('.lang-switcher');
        if (!switcher) return;
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === this.lang);
        });
        if (!switcher.dataset.i18nBound) {
            switcher.addEventListener('click', (e) => {
                const btn = e.target.closest('.lang-btn');
                if (btn) this.switchLang(btn.getAttribute('data-lang'));
            });
            switcher.dataset.i18nBound = 'true';
        }
    }

    updateMeta() {
        const desc = this.t('meta.description');
        if (desc) {
            let meta = document.querySelector('meta[name="description"]');
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute('name', 'description');
                document.head.appendChild(meta);
            }
            meta.setAttribute('content', desc);
        }
    }
}

export const i18n = new I18n();
