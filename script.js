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

    /* ---------------- Dot grid that reacts to the cursor ------------- */
    // The notebook dots are redrawn on a fixed canvas behind the page so they
    // can swell, lean away from the pen and turn ballpoint blue near it.
    // Stateless: displacement is a function of distance to a smoothed cursor,
    // so it stays correct while scrolling. Idle = no frames. Reduced motion
    // or no canvas = the static CSS grid stays.
    (function dotField() {
        if (reduced.matches) return;
        var cv = document.createElement('canvas');
        var ctx = cv.getContext && cv.getContext('2d');
        if (!ctx) return;

        var PITCH = 26, OFFSET = 13, R = 320, PUSH = 7, GROW = 0.8, TINT = 0.55, BASE_R = 1.25;
        var lastT = 0;
        var w = 0, h = 0, dpr = 1;
        var dotColor = '', penColor = '';
        var tx = -9999, ty = -9999, sx = -9999, sy = -9999;
        var power = 0, target = 0, raf = 0, lastScroll = -1;

        cv.setAttribute('aria-hidden', 'true');
        cv.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none';
        document.body.insertBefore(cv, document.body.firstChild);
        root.classList.add('has-dots');

        function readColors() {
            var cs = getComputedStyle(root);
            dotColor = cs.getPropertyValue('--dot').trim();
            penColor = cs.getPropertyValue('--pen').trim();
        }

        function resize() {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = window.innerWidth;
            h = window.innerHeight;
            cv.width = Math.round(w * dpr);
            cv.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            draw();
        }

        function draw() {
            raf = 0;
            var scrollY = window.pageYOffset || 0;
            lastScroll = scrollY;
            ctx.clearRect(0, 0, w, h);

            var shift = -(((scrollY % PITCH) + PITCH) % PITCH) + OFFSET;
            var cols = Math.ceil(w / PITCH) + 1;
            var rows = Math.ceil(h / PITCH) + 2;
            var r2 = R * R;

            // Far dots: one batched path.
            ctx.fillStyle = dotColor;
            ctx.beginPath();
            var near = [];
            for (var j = -1; j < rows; j++) {
                var y = shift + j * PITCH;
                for (var i = 0; i < cols; i++) {
                    var x = OFFSET + i * PITCH;
                    var dx = x - sx, dy = y - sy;
                    var d2 = dx * dx + dy * dy;
                    if (power > 0.002 && d2 < r2) {
                        near.push(x, y, d2, dx, dy);
                    } else {
                        ctx.moveTo(x + BASE_R, y);
                        ctx.arc(x, y, BASE_R, 0, 6.2832);
                    }
                }
            }
            ctx.fill();

            // Near dots: individually pushed, grown, tinted.
            for (var k = 0; k < near.length; k += 5) {
                var d = Math.sqrt(near[k + 2]);
                var f = 1 - d / R;
                // smootherstep: no visible edge where the influence ends
                var e = f * f * f * (f * (f * 6 - 15) + 10) * power;
                var ux = d > 0.01 ? near[k + 3] / d : 0;
                var uy = d > 0.01 ? near[k + 4] / d : 0;
                var px = near[k] + ux * PUSH * e;
                var py = near[k + 1] + uy * PUSH * e;
                var rad = BASE_R + e * GROW;

                ctx.globalAlpha = 1;
                ctx.fillStyle = dotColor;
                ctx.beginPath();
                ctx.arc(px, py, rad, 0, 6.2832);
                ctx.fill();
                if (e > 0.02) {
                    ctx.globalAlpha = e * TINT;
                    ctx.fillStyle = penColor;
                    ctx.beginPath();
                    ctx.arc(px, py, rad, 0, 6.2832);
                    ctx.fill();
                }
            }
            ctx.globalAlpha = 1;
        }

        function frame(t) {
            raf = 0;
            // Time-based damping: same feel at 60, 120 or 144 Hz.
            var dt = lastT ? Math.min((t - lastT) / 1000, 0.05) : 0.016;
            lastT = t;
            var kPos = 1 - Math.exp(-dt * 4.2);
            var kPow = 1 - Math.exp(-dt * 3);
            sx += (tx - sx) * kPos;
            sy += (ty - sy) * kPos;
            power += (target - power) * kPow;
            var settled = Math.abs(tx - sx) < 0.3 && Math.abs(ty - sy) < 0.3 &&
                Math.abs(target - power) < 0.003;
            if (settled) { sx = tx; sy = ty; power = target; lastT = 0; }
            draw();
            if (!settled) raf = window.requestAnimationFrame(frame);
        }

        function wake() { if (!raf) { lastT = 0; raf = window.requestAnimationFrame(frame); } }

        window.addEventListener('pointermove', function (e) {
            if (e.pointerType === 'touch') return;
            if (target === 0) { sx = tx = e.clientX; sy = ty = e.clientY; }
            tx = e.clientX; ty = e.clientY;
            target = 1;
            wake();
        }, { passive: true });

        document.documentElement.addEventListener('pointerleave', function () {
            target = 0; wake();
        });
        window.addEventListener('blur', function () { target = 0; wake(); });

        window.addEventListener('scroll', function () {
            if (!raf && (window.pageYOffset || 0) !== lastScroll) raf = window.requestAnimationFrame(frame);
        }, { passive: true });
        window.addEventListener('resize', resize, { passive: true });

        new MutationObserver(function () { readColors(); draw(); })
            .observe(root, { attributes: true, attributeFilter: ['data-theme'] });

        readColors();
        resize();
    })();

    /* ---------------- Round selector cursor -------------------------- */
    (function ringCursor() {
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
        var ring = document.createElement('div');
        var dot = document.createElement('div');
        ring.className = 'ring';
        dot.className = 'ring__dot';
        ring.setAttribute('aria-hidden', 'true');
        dot.setAttribute('aria-hidden', 'true');
        document.body.appendChild(ring);
        document.body.appendChild(dot);

        var x = 0, y = 0, rx = 0, ry = 0, raf = 0, lastT = 0, seen = false;
        var LINK = 'a, button, [role="button"], summary, label';
        var TEXT = 'input, textarea, select';

        function set(el, cls, on) { el.classList.toggle(cls, on); }

        function tick(t) {
            raf = 0;
            var dt = lastT ? Math.min((t - lastT) / 1000, 0.05) : 0.016;
            lastT = t;
            var k = reduced.matches ? 1 : 1 - Math.exp(-dt * 16);
            rx += (x - rx) * k;
            ry += (y - ry) * k;
            ring.style.transform = 'translate3d(' + rx.toFixed(2) + 'px,' + ry.toFixed(2) + 'px,0)';
            if (Math.abs(x - rx) > 0.1 || Math.abs(y - ry) > 0.1) raf = window.requestAnimationFrame(tick);
            else lastT = 0;
        }

        window.addEventListener('pointermove', function (e) {
            if (e.pointerType === 'touch') return;
            x = e.clientX; y = e.clientY;
            dot.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
            if (!seen) {
                seen = true; rx = x; ry = y;
                root.classList.add('has-ring');
                set(ring, 'is-on', true); set(dot, 'is-on', true);
            }
            var t = e.target;
            if (t && t.closest) {
                var field = !!t.closest('.sec--field');
                set(ring, 'is-link', !!t.closest(LINK));
                set(ring, 'is-field', field); set(dot, 'is-field', field);
                var txt = !!t.closest(TEXT);
                set(ring, 'is-text', txt); set(dot, 'is-text', txt);
            }
            if (!raf) raf = window.requestAnimationFrame(tick);
        }, { passive: true });

        window.addEventListener('pointerdown', function () { set(ring, 'is-down', true); });
        window.addEventListener('pointerup', function () { set(ring, 'is-down', false); });
        root.addEventListener('pointerleave', function () { set(ring, 'is-on', false); set(dot, 'is-on', false); });
        root.addEventListener('pointerenter', function () { if (seen) { set(ring, 'is-on', true); set(dot, 'is-on', true); } });
    })();

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
