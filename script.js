document.addEventListener('DOMContentLoaded', () => {
    // --- Language Switcher Logic ---
    const langBtns = document.querySelectorAll('.lang-btn');
    const html = document.documentElement;

    // Check localStorage for saved language, default to 'en'
    const savedLang = localStorage.getItem('atlas_lang') || 'en';
    switchLanguage(savedLang);

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });

    function switchLanguage(lang) {
        // Save preference
        localStorage.setItem('atlas_lang', lang);

        // Update Buttons
        langBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });

        // Update Content
        const allLangElements = document.querySelectorAll('.en, .fr, .ar');
        allLangElements.forEach(el => {
            el.classList.remove('active');
            if (el.classList.contains(lang)) {
                el.classList.add('active');
            }
        });

        // Update Direction (RTL for Arabic)
        if (lang === 'ar') {
            html.setAttribute('dir', 'rtl');
            html.setAttribute('lang', 'ar');
        } else {
            html.setAttribute('dir', 'ltr');
            html.setAttribute('lang', lang);
        }
    }

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for potential sticky headers usually, though currently header is overlay
                    behavior: 'smooth'
                });
            }
        });
    });
});
