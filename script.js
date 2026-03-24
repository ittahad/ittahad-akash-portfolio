// ===================================
// Theme Management with Cookies
// ===================================

// Cookie helper functions
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Initialize theme from cookie or system preference
function initializeTheme() {
    const savedTheme = getCookie('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', theme);
}

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        themeToggle.style.transform = 'rotate(360deg) scale(1.1)';

        setTimeout(() => {
            document.documentElement.setAttribute('data-theme', newTheme);
            setCookie('theme', newTheme, 365);
        }, 150);

        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 600);
    });
}

// Initialize theme on page load
initializeTheme();

// ===================================
// Navigation & Scroll Effects
// ===================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollProgress = document.getElementById('scroll-progress');
const pageCurtain = document.getElementById('page-curtain');
const pageCurtainPanel = pageCurtain?.querySelector('.page-curtain__panel');
const pageCurtainLabel = document.getElementById('page-curtain-label');

const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const SCROLL_NAV_OFFSET = 88;
const CURTAIN_MS = 520;

/** Shown on the red curtain while it covers the screen (edit labels here) */
const SECTION_PAGE_TITLE = {
    home: 'HOME',
    about: 'ABOUT',
    experience: 'EXPERIENCE',
    projects: 'PROJECTS',
    articles: 'ARTICLES',
    opensource: 'OPEN SOURCE',
    contact: 'CONTACT'
};

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function setCurtainPageTitle(sectionId) {
    if (!pageCurtainLabel) return;
    const raw =
        SECTION_PAGE_TITLE[sectionId] ||
        (sectionId && sectionId.replace(/-/g, ' ').toUpperCase()) ||
        'NEXT';
    const words = raw.trim().split(/\s+/).filter(Boolean);
    pageCurtainLabel.innerHTML = words
        .map((w) => `<span class="word">${escapeHtml(w)}</span>`)
        .join('');
}

function clearCurtainPageTitle() {
    if (pageCurtainLabel) pageCurtainLabel.innerHTML = '';
    pageCurtain?.classList.remove('is-typo-on', 'is-typo-pop');
}

/** Which section is “current” for the fixed nav underline (scroll-spy) */
function getScrollSpySections() {
    return document.querySelectorAll('.hero[id], .section[id]');
}

function updateActiveNavLink() {
    const sections = getScrollSpySections();
    if (!sections.length) return;

    const trigger = window.scrollY + SCROLL_NAV_OFFSET + 20;
    let currentId = sections[0].id;

    sections.forEach((section) => {
        const sectionTop = window.scrollY + section.getBoundingClientRect().top;
        if (trigger >= sectionTop) {
            currentId = section.id;
        }
    });

    navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            link.classList.toggle('active', href === `#${currentId}`);
        }
    });
}

// Mobile menu toggle
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        navToggle?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class for styling
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update scroll progress bar
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (currentScroll / windowHeight) * 100;
    if (scrollProgress) scrollProgress.style.width = scrolled + '%';

    lastScroll = currentScroll;
    updateActiveNavLink();
});

window.addEventListener('resize', updateActiveNavLink, { passive: true });
window.addEventListener('hashchange', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);
updateActiveNavLink();

// ===================================
// Page curtain + in-page navigation
// ===================================

function settleCurtainAtBottom() {
    document.body.classList.add('curtain-idle-bottom');
}

function removeCurtainIdle() {
    document.body.classList.remove('curtain-idle-bottom');
}

function scrollToTargetInstant(el) {
    const top = el.getBoundingClientRect().top + window.pageYOffset - SCROLL_NAV_OFFSET;
    window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
}

function runNavCurtain(targetEl, doneCallback) {
    if (!pageCurtain || !pageCurtainPanel || prefersReducedMotion()) {
        scrollToTargetInstant(targetEl);
        doneCallback?.();
        return;
    }

    const sectionId = targetEl.id || '';

    clearCurtainPageTitle();
    setCurtainPageTitle(sectionId);
    pageCurtain.classList.add('is-typo-on');

    removeCurtainIdle();
    pageCurtain.classList.add('is-active', 'is-nav-cover');

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            pageCurtain.classList.add('is-typo-pop');
        });
    });

    window.setTimeout(() => {
        scrollToTargetInstant(targetEl);
        clearCurtainPageTitle();
        pageCurtain.classList.remove('is-nav-cover');
        pageCurtain.classList.add('is-nav-reveal');
        window.setTimeout(() => {
            pageCurtain.classList.remove('is-active', 'is-nav-reveal');
            settleCurtainAtBottom();
            doneCallback?.();
        }, CURTAIN_MS + 40);
    }, CURTAIN_MS);
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#' || href.length < 2) return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        runNavCurtain(target);
    });
});

function initPageIntro() {
    if (!pageCurtain || !pageCurtainPanel) {
        document.body.classList.remove('has-page-intro');
        settleCurtainAtBottom();
        return;
    }

    if (prefersReducedMotion()) {
        document.body.classList.remove('has-page-intro');
        settleCurtainAtBottom();
        return;
    }

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.classList.add('is-intro-leaving');
        });
    });

    let finished = false;
    const finish = () => {
        if (finished) return;
        finished = true;
        document.body.classList.remove('has-page-intro', 'is-intro-leaving');
        settleCurtainAtBottom();
    };

    pageCurtainPanel.addEventListener(
        'transitionend',
        (e) => {
            if (e.propertyName === 'transform') finish();
        },
        { once: true }
    );
    window.setTimeout(finish, 900);
}

function initSectionReveals() {
    document.querySelectorAll('.section').forEach((section) => {
        section.classList.add('js-section-reveal');
    });
    const marquee = document.querySelector('.marquee-strip');
    if (marquee) marquee.classList.add('js-section-reveal');

    if (prefersReducedMotion()) {
        document.querySelectorAll('.js-section-reveal').forEach((el) => el.classList.add('is-in-view'));
        return;
    }

    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-in-view');
                io.unobserve(entry.target);
            });
        },
        { threshold: 0.06, rootMargin: '0px 0px -10% 0px' }
    );

    document.querySelectorAll('.js-section-reveal').forEach((el) => io.observe(el));
}

// ===================================
// Typing Effect for Hero Section
// ===================================

const typingText = document.querySelector('.typing-text');
const texts = [
    'Senior Software Engineer',
    '.NET Microservices Expert',
    'Cloud Architecture Specialist',
    'CQRS & DDD Enthusiast',
    'Tech Lead & Mentor',
    'Youtube Creator'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    if (!typingText) return;
    const currentText = texts[textIndex];

    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        // Pause at end
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
}

// Start typing effect
if (typingText) {
    setTimeout(type, 1000);
}

// ===================================
// Scroll Animations
// ===================================

const animateOnScroll = () => {
    const elements = document.querySelectorAll(
        '.stat-card, .cert-item, .publication-card, .timeline-item, .project-card, .article-card, .repo-card, .contact-card'
    );

    if (prefersReducedMotion()) {
        elements.forEach((el) => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    );

    elements.forEach((el) => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
};

// Initialize scroll animations
animateOnScroll();

// ===================================
// 3D Section Transitions
// ===================================

// Section entrance handled in CSS; keep hook for future use
const init3DTransitions = () => {};

init3DTransitions();

// ===================================
// Counter Animation for Stats
// ===================================

const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                const suffix = finalValue.replace(/[0-9]/g, '');

                let current = 0;
                const increment = numericValue / 50;
                const duration = 2000;
                const stepTime = duration / 50;

                const counter = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        target.textContent = numericValue + suffix;
                        clearInterval(counter);
                    } else {
                        target.textContent = Math.floor(current) + suffix;
                    }
                }, stepTime);

                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });
};

// Initialize counter animations
animateCounters();

// Hero orbs: CSS handles motion so keyframes are not overridden by JS parallax

// ===================================
// Project Filtering (Optional Enhancement)
// ===================================

// This can be extended if you want to add filter buttons
const filterProjects = (category) => {
    const projects = document.querySelectorAll('.project-card');

    projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'flex';
        } else {
            project.style.display = 'none';
        }
    });
};

// ===================================
// Lazy Loading for Images (if added later)
// ===================================

const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

// Initialize lazy loading
lazyLoadImages();

// ===================================
// Scroll to Top Button (Optional)
// ===================================

const createScrollToTop = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 8px;
        background: #ff2d00;
        border: 1px solid #ff2d00;
        color: white;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1200;
        box-shadow: 0 12px 40px rgba(255, 45, 0, 0.35);
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });

    button.addEventListener('click', () => {
        const home = document.getElementById('home');
        if (home) {
            runNavCurtain(home);
        } else {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
        }
    });

    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px) scale(1.1)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0) scale(1)';
    });
};

// Create scroll to top button
createScrollToTop();

// ===================================
// Performance Optimization
// ===================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===================================
// Firebase Visitor Counter
// ===================================

// Firebase configuration - You need to replace these with your actual Firebase config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
try {
    if (typeof firebase !== 'undefined' && !firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        initVisitorCounter();
    } else {
        console.log('Firebase not loaded or already initialized');
        // Show fallback if Firebase is not available
        const vc = document.getElementById('visitor-count');
        if (vc) vc.textContent = '---';
    }
} catch (error) {
    console.error('Firebase initialization error:', error);
    const vc = document.getElementById('visitor-count');
    if (vc) vc.textContent = '---';
}

function initVisitorCounter() {
    const database = firebase.database();
    const visitorRef = database.ref('visitors');

    // Check if user has visited before using sessionStorage
    const hasVisitedThisSession = sessionStorage.getItem('hasVisited');

    if (!hasVisitedThisSession) {
        // Increment visitor count
        visitorRef.transaction((currentCount) => {
            return (currentCount || 0) + 1;
        }).then((result) => {
            if (result.committed) {
                updateVisitorDisplay(result.snapshot.val());
                // Mark as visited in this session
                sessionStorage.setItem('hasVisited', 'true');
            }
        }).catch((error) => {
            console.error('Transaction failed:', error);
            const vc = document.getElementById('visitor-count');
            if (vc) vc.textContent = '---';
        });
    } else {
        // Just read the current count
        visitorRef.once('value').then((snapshot) => {
            updateVisitorDisplay(snapshot.val() || 0);
        }).catch((error) => {
            console.error('Error reading visitor count:', error);
            const vc = document.getElementById('visitor-count');
            if (vc) vc.textContent = '---';
        });
    }
}

function updateVisitorDisplay(count) {
    const visitorCountElement = document.getElementById('visitor-count');
    if (!visitorCountElement) return;

    // Animate the count
    const duration = 1000;
    const steps = 30;
    const increment = count / steps;
    let currentCount = 0;

    const timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= count) {
            visitorCountElement.textContent = count.toLocaleString();
            clearInterval(timer);
        } else {
            visitorCountElement.textContent = Math.floor(currentCount).toLocaleString();
        }
    }, duration / steps);
}

// ===================================
// Initialize Everything
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initPageIntro();
    initSectionReveals();
});

// ===================================
// Easter Egg - Console Message
// ===================================

console.log('%cHello there', 'font-size: 18px; font-weight: bold; color: #ff2d00;');
console.log('%cLooking for something? Reach out.', 'font-size: 13px; color: #9c9890;');
console.log('%ccontact@ittahad.site', 'font-size: 13px; color: #f5f2eb;');
console.log('%chttps://www.linkedin.com/in/ittahad', 'font-size: 13px; color: #ff2d00;');
