/* ===================================================================
   Ittahad Uz Zaman — portfolio behaviour
   Motion lives in CSS. This file only does what CSS cannot:
   theme persistence, the typed role line, menu state, scroll-spy,
   and the reveal fallback for browsers without scroll-driven animation.
   =================================================================== */
(function () {
    'use strict';

    var root = document.documentElement;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    var supportsSDA = !!(window.CSS && CSS.supports && CSS.supports('animation-timeline', 'view()'));

    /* ---------------- Theme ---------------------------------------- */
    var THEME_KEY = 'theme';
    var THEME_DAYS = 365;
    var THEME_COLOR = { light: '#e7edd8', dark: '#0f1830' };

    function readCookie(name) {
        var m = document.cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
        return m ? decodeURIComponent(m[1]) : null;
    }

    function writeCookie(name, value, days) {
        var d = new Date();
        d.setTime(d.getTime() + days * 864e5);
        document.cookie = name + '=' + encodeURIComponent(value) +
            ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
    }

    function labelFor(theme) {
        return theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
    }

    var themeBtn = document.getElementById('theme-toggle');

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', THEME_COLOR[theme]);
        if (themeBtn) {
            themeBtn.setAttribute('aria-label', labelFor(theme));
            themeBtn.setAttribute('title', labelFor(theme));
        }
    }

    var osDark = window.matchMedia('(prefers-color-scheme: dark)');
    var stored = readCookie(THEME_KEY);
    applyTheme(stored === 'light' || stored === 'dark' ? stored : (osDark.matches ? 'dark' : 'light'));

    if (themeBtn) {
        themeBtn.addEventListener('click', function () {
            var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(next);
            writeCookie(THEME_KEY, next, THEME_DAYS);
        });
    }

    // Follow the OS while the visitor has not chosen for themselves.
    var onOsChange = function (e) {
        if (!readCookie(THEME_KEY)) applyTheme(e.matches ? 'dark' : 'light');
    };
    if (osDark.addEventListener) osDark.addEventListener('change', onOsChange);
    else if (osDark.addListener) osDark.addListener(onOsChange);

    /* ---------------- Typed role line ------------------------------ */
    var LINES = [
        'Senior Software Engineer @ BRAC IT Services',
        'Ex-Deputy Engineering Manager @ SELISE',
        '.NET · CQRS · Domain-Driven Design',
        'Kubernetes · Azure · AWS · OpenTelemetry'
    ];

    var typed = document.getElementById('typed');

    if (typed) {
        if (reduced.matches) {
            typed.textContent = LINES[0];
            var caret = document.querySelector('.caret');
            if (caret) caret.remove();
        } else {
            var li = 0, ci = 0, deleting = false;
            (function tick() {
                var line = LINES[li];
                typed.textContent = line.slice(0, ci);

                var wait;
                if (!deleting) {
                    if (ci < line.length) {
                        ci++;
                        wait = 46 + Math.random() * 44;
                    } else {
                        deleting = true;
                        wait = 2100;
                    }
                } else {
                    if (ci > 0) {
                        ci--;
                        wait = 22;
                    } else {
                        deleting = false;
                        li = (li + 1) % LINES.length;
                        wait = 320;
                    }
                }
                window.setTimeout(tick, wait);
            })();
        }
    }

    /* ---------------- Nav: stuck state + mobile menu --------------- */
    var nav = document.getElementById('nav');
    var menu = document.getElementById('nav-menu');
    var burger = document.getElementById('nav-toggle');

    function closeMenu() {
        if (!menu || !burger) return;
        menu.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Open menu');
    }

    if (burger && menu) {
        burger.addEventListener('click', function () {
            var open = !menu.classList.contains('is-open');
            menu.classList.toggle('is-open', open);
            burger.classList.toggle('is-open', open);
            burger.setAttribute('aria-expanded', String(open));
            burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        });

        menu.addEventListener('click', function (e) {
            if (e.target.closest('a')) closeMenu();
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeMenu();
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 1020) closeMenu();
        }, { passive: true });
    }

    /* ---------------- Scroll-spy + progress fallback --------------- */
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
    var progress = document.getElementById('progress');

    var sections = Array.prototype.slice
        .call(document.querySelectorAll('main section[id]'))
        .map(function (el) { return { id: el.id, el: el }; });

    function setActive(id) {
        navLinks.forEach(function (a) {
            var on = a.getAttribute('href') === '#' + id;
            a.classList.toggle('is-active', on);
            if (on) a.setAttribute('aria-current', 'true');
            else a.removeAttribute('aria-current');
        });
    }

    var ticking = false;

    function onScroll() {
        var y = window.scrollY || window.pageYOffset;

        if (nav) nav.classList.toggle('is-stuck', y > 12);

        // Progress bar: CSS drives this when scroll-driven animation exists.
        if (progress && !supportsSDA) {
            var max = document.documentElement.scrollHeight - window.innerHeight;
            progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
        }

        // Nearest section whose top has passed the reading line.
        var line = y + window.innerHeight * 0.34;
        var current = null;
        for (var i = 0; i < sections.length; i++) {
            if (sections[i].el.offsetTop <= line) current = sections[i].id;
        }
        setActive(current || '');

        ticking = false;
    }

    function requestScroll() {
        if (!ticking) {
            ticking = true;
            window.requestAnimationFrame(onScroll);
        }
    }

    window.addEventListener('scroll', requestScroll, { passive: true });
    window.addEventListener('resize', requestScroll, { passive: true });
    onScroll();

    /* ---------------- Reveal fallback ------------------------------ */
    // Browsers with scroll-driven animation need nothing here; the CSS
    // @supports block owns it. Elsewhere: hide on load, flip .is-seen.
    // Without IntersectionObserver or with reduced motion, nothing is hidden.
    if (!supportsSDA && !reduced.matches && 'IntersectionObserver' in window) {
        root.classList.add('js-reveal');
        var targets = document.querySelectorAll('.rv, .sec .hl:not(.hl--load), .contact__mail');
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-seen');
                    io.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

        Array.prototype.forEach.call(targets, function (t) { io.observe(t); });
    }

    /* ---------------- Copy email ----------------------------------- */
    var copyEmailBtn = document.getElementById('copy-email-btn');
    var copyStatus = document.getElementById('copy-status');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', function (e) {
            e.preventDefault();
            var email = 'contact@ittahad.site';
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(email).then(function () {
                    copyEmailBtn.classList.add('is-copied');
                    copyEmailBtn.setAttribute('title', 'Copied to clipboard!');
                    if (copyStatus) copyStatus.textContent = 'Email address copied';
                    window.setTimeout(function () {
                        copyEmailBtn.classList.remove('is-copied');
                        copyEmailBtn.setAttribute('title', 'Copy email');
                        if (copyStatus) copyStatus.textContent = '';
                    }, 2000);
                });
            } else {
                window.prompt('Copy email address:', email);
            }
        });
    }

    /* ---------------- Console note --------------------------------- */
    if (window.console && console.log) {
        console.log(
            '%cIttahad Uz Zaman%c  Senior Software Engineer\n' +
            'Motion here is CSS scroll-driven animation — no animation library.\n' +
            'Reading the source? contact@ittahad.site',
            'font-weight:700;font-size:13px',
            'font-weight:400;font-size:13px;opacity:.65'
        );
    }
})();
