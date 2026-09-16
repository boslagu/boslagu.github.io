/**
 * Portfolio Main JavaScript
 * Handles navigation, smooth scrolling, project rendering, and contact form
 */

import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js';

(function () {
    'use strict';

    // ============================================
    // Project Data
    // ============================================
    const projects = [
        {
            name: 'APW File Service',
            company: 'Axos Business Center Corp.',
            category: 'backend',
            tags: ['GoLang', 'REST API', 'SQL'],
            description: 'Centralized APW microservice for secure file transfer, spreadsheet, import and lookup of data.'
        },
        {
            name: 'APW Status Callback API',
            company: 'Axos Business Center Corp.',
            category: 'backend',
            tags: ['GoLang', 'SSE', 'SQL', 'RabbitMQ'],
            description: 'An API service that provides status updates and callbacks for various internal processes, ensuring reliable communication between APW-API, APW Frontend and third-party systems.'
        },
        {
            name: 'APW-SSO',
            company: 'Axos Business Center Corp.',
            category: 'backend',
            tags: ['GoLang', 'REST API', 'SQL'],
            description: 'Single Sign-On service for managing user authentication and authorization across internal applications.'
        },
        {
            name: 'APW-API',
            company: 'Axos Business Center Corp.',
            category: 'backend',
            tags: ['GoLang', 'REST API', 'SQL'],
            description: 'Backend APIs for a trading platform handling orders, positions, and market data.'
        },
        {
            name: 'Securities Integrator',
            company: 'Axos Business Center Corp.',
            category: 'backend',
            tags: ['GoLang', 'REST API', 'SQL'],
            description: 'Integration services for securities data and trade settlement, connecting core systems with external market data providers.'
        },
        {
            name: 'Aggelos',
            company: 'FDS ASYA PHILIPPINES INC.',
            category: 'backend',
            tags: ['GoLang', 'REST API', 'SQL'],
            description: 'High-volume SMS gateway handling transactional and OTP messages reliably for client applications.'
        },
        {
            name: 'Janus Gate',
            company: 'FDS ASYA PHILIPPINES INC.',
            category: 'backend',
            tags: ['Python', 'REST API', 'SQL'],
            description: 'Bridge API service enabling secure communication between internal banking services and partner systems.'
        },
        {
            name: 'Core MFS',
            company: 'FDS ASYA PHILIPPINES INC.',
            category: 'backend',
            tags: ['GoLang', 'REST API', 'SQL'],
            description: 'Core money movement services powering financial transactions with reconciliation and audit logging.'
        },
        {
            name: 'Mercury',
            company: 'FDS ASYA PHILIPPINES INC.',
            category: 'backend',
            tags: ['GoLang', 'REST API', 'SQL'],
            description: 'QR Ph payments API enabling QR-based payments between banks and e-wallets.'
        },
        {
            name: 'Instapay QRPH',
            company: 'FDS ASYA PHILIPPINES INC.',
            category: 'backend',
            tags: ['GoLang', 'REST API', 'SQL'],
            description: 'Integration with the InstaPay rail for real-time low-value fund transfers via QR Ph.'
        },
        {
            name: 'Soteria',
            company: 'FDS ASYA PHILIPPINES INC.',
            category: 'backend',
            tags: ['Java', 'REST API', 'SQL'],
            description: 'Authentication and identity service providing secure login, token management, and access control.'
        },
        {
            name: 'Report API',
            company: 'Axos Business Center',
            category: 'backend',
            tags: ['GoLang', 'REST API', 'SQL'],
            description: 'Reporting backend exposing aggregated business data through RESTful endpoints.'
        },
        {
            name: 'AllRewards',
            company: 'AllValue Holdings Corp.',
            category: 'mobile',
            tags: ['Flutter', 'REST API'],
            description: 'Loyalty and rewards mobile app built with Flutter and backed by REST APIs, available to the public on Google Play.',
            links: [
                {
                    label: 'Google Play',
                    url: 'https://play.google.com/store/apps/details?id=com.app.allrewards&hl=en'
                }
            ]
        },
        {
            name: 'konek2CARD PLUS',
            company: 'FDS ASYA PHILIPPINES INC.',
            category: 'mobile',
            tags: ['Flutter', 'REST API'],
            description: 'Card companion mobile app for cardholders to manage accounts, transactions, and payments. Available to the public on Google Play.',
            links: [
                {
                    label: 'Google Play',
                    url: 'https://play.google.com/store/apps/details?id=com.fdsap.konek2card&hl=en'
                }
            ]
        },
        {
            name: 'Webtool',
            company: 'FDS ASYA PHILIPPINES INC.',
            category: 'web',
            tags: ['Java', 'HTML/CSS', 'SQL'],
            description: 'Internal web application streamlining operations workflows for the back-office team.'
        },
        {
            name: 'Core MFS Web App',
            company: 'CMIT',
            category: 'web',
            tags: ['GoLang', 'HTML/CSS'],
            description: 'Web application front-end for the Core MFS platform.'
        }
    ];

    // ============================================
    // Project Icons
    // ============================================

    const lockIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';

    const externalLinkIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>';

    // ============================================
    // Device Fingerprinting
    // ============================================
    function getDeviceId() {
        const key = 'boslagu_device_id';
        let id = localStorage.getItem(key);
        if (!id) {
            id = crypto.randomUUID();
            localStorage.setItem(key, id);
        }
        return id;
    }

    function getBrowser() {
        const ua = navigator.userAgent;
        if (ua.includes('Firefox/')) return 'Firefox ' + (ua.split('Firefox/')[1] || '').split(' ')[0];
        if (ua.includes('Edg/'))   return 'Edge ' + (ua.split('Edg/')[1] || '').split(' ')[0];
        if (ua.includes('OPR/'))   return 'Opera ' + (ua.split('OPR/')[1] || '').split(' ')[0];
        if (ua.includes('Chrome/')) return 'Chrome ' + (ua.split('Chrome/')[1] || '').split(' ')[0];
        if (ua.includes('Safari/') && ua.includes('Version/')) {
            return 'Safari ' + (ua.split('Version/')[1] || '').split(' ')[0];
        }
        return 'Unknown';
    }

    function getOS() {
        const ua = navigator.userAgent;
        if (ua.includes('Windows NT 10')) return 'Windows 10+';
        if (ua.includes('Windows NT 6'))  return 'Windows 7/8';
        if (ua.includes('Mac OS X'))      return 'macOS ' + (ua.split('Mac OS X ')[1] || '').split(';')[0].replace(/_/g, '.');
        if (ua.includes('Android'))       return 'Android ' + (ua.split('Android ')[1] || '').split(';')[0];
        if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS ' + (ua.split('OS ')[1] || '').split(' ')[0].replace(/_/g, '.');
        if (ua.includes('Linux'))         return 'Linux';
        return 'Unknown';
    }

    // ============================================
    // DOM Elements
    // ============================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero');
    const contactForm = document.getElementById('contact-form');
    const projectsGrid = document.getElementById('projects-grid');
    const projectFilters = document.getElementById('project-filters');

    // ============================================
    // Project Rendering & Filtering
    // ============================================
    function renderProjects(filter = 'all') {
        const filtered = filter === 'all'
            ? projects
            : projects.filter(project => project.category === filter);

        projectsGrid.innerHTML = filtered.map(project => {
            const hasLinks = Array.isArray(project.links) && project.links.length > 0;
            const badgeClass = hasLinks ? 'project-badge is-public' : '';
            const badgeLabel = hasLinks ? 'Public' : 'Confidential';

            const linksHtml = hasLinks
                ? `<div class="project-links">
                        ${project.links.map(link => `
                            <a href="${link.url}" class="project-link" target="_blank" rel="noopener noreferrer">
                                ${externalLinkIcon}
                                ${link.label}
                            </a>
                        `).join('')}
                   </div>`
                : `<div class="project-note">
                       
                   </div>`;

            return `
                <article class="project-card" data-category="${project.category}">
                    <h3 class="project-title">${project.name}</h3>
                    <div class="project-company">${project.company}</div>
                    <p class="project-description">
                        ${project.description}
                    </p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    <span class="project-badge ${badgeClass}" title="${hasLinks ? 'Publicly available' : 'Internal project'}">${badgeLabel}</span>
                    ${linksHtml}
                </article>
            `;
        }).join('');

        // Re-initialize scroll animations for newly rendered cards
        initScrollAnimations(projectsGrid.querySelectorAll('.project-card'));
    }

    if (projectFilters) {
        projectFilters.addEventListener('click', (e) => {
            const btn = e.target.closest('.filter-btn');
            if (!btn) return;

            projectFilters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            renderProjects(btn.dataset.filter);
        });
    }

    // ============================================
    // Scroll Animations
    // ============================================
    let animateOnScroll;

    function createObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        animateOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    animateOnScroll.unobserve(entry.target);
                }
            });
        }, observerOptions);
    }

    function initScrollAnimations(elements) {
        if (!animateOnScroll) createObserver();

        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.classList.add(`animate-delay-${(index % 3) + 1}`);
            animateOnScroll.observe(el);
        });
    }

    // ============================================
    // Mobile Navigation Toggle
    // ============================================
    function toggleMobileNav() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    }

    function closeMobileNav() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }

    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileNav);
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileNav();
        }
    });

    // ============================================
    // Navbar Scroll Effect
    // ============================================
    const scrollThreshold = 50;

    function handleScroll() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // ============================================
    // Active Navigation Link
    // ============================================
    function updateActiveLink() {
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Scroll to top for plain "#" links (e.g. logo)
            if (!targetId || targetId === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // Contact Form Handling
    // ============================================
    // Writes submissions to Cloud Firestore.
    // Write access is enforced by the Firestore Security Rules in
    // `firestore.rules` at the root of this repository.

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            if (formData.get('website')) {
                showNotification('Submission blocked.', 'error');
                return;
            }

            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            addDoc(collection(db, 'messages'), {
                name: name.trim(),
                email: email.trim().toLowerCase(),
                message: message.trim(),
                browser: getBrowser(),
                os: getOS(),
                deviceId: getDeviceId(),
                createdAt: serverTimestamp(),
                source: 'portfolio-contact-form'
            })
                .then(() => {
                    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error('Firestore write failed:', error.code, '-', error.message);
                    let hint = 'Please try again or email me directly.';
                    if (error.code === 'permission-denied') {
                        hint = 'Check your Firestore Security Rules and database setup.';
                    } else if (error.code === 'unavailable' || error.code === 'network-error') {
                        hint = 'Check your connection and the Firebase config in js/firebase-config.js.';
                    } else if (error.code === 'invalid-argument') {
                        hint = 'Submission failed validation. Check the form fields.';
                    }
                    showNotification('Something went wrong. ' + hint, 'error');
                })
                .finally(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ============================================
    // Notification System
    // ============================================
    function showNotification(message, type = 'info') {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close notification">&times;</button>
        `;

        notification.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            padding: 16px 24px;
            background-color: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#6366f1'};
            color: white;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
        `;

        document.body.appendChild(notification);

        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideOut {
                    from { opacity: 1; transform: translateY(0); }
                    to { opacity: 0; transform: translateY(20px); }
                }
            `;
            document.head.appendChild(style);
        }

        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        `;

        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });

        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // ============================================
    // Performance: Throttle scroll events
    // ============================================
    function throttle(func, limit) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    const throttledScroll = throttle(() => {
        handleScroll();
        updateActiveLink();
    }, 100);

    window.addEventListener('scroll', throttledScroll, { passive: true });

    // ============================================
    // Keyboard Navigation Support
    // ============================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileNav();
        }
    });

    // ============================================
    // Initialize
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        renderProjects('all');

        initScrollAnimations(document.querySelectorAll(
            '.highlight-card, .skill-category, .arch-card, .stat, .contact-item, .timeline-content, .cert-item'
        ));

        updateActiveLink();
        document.body.classList.add('loaded');
    });

})();