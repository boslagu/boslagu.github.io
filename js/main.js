/**
 * Portfolio Main JavaScript
 * Handles navigation, smooth scrolling, project rendering, and contact form
 */

import { db } from './firebase-config.js';
import {
    collection,
    addDoc,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    onSnapshot,
    serverTimestamp
} from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js';

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
    const DEVICE_ID_KEY = 'boslagu_device_id';

    // The stored id is the visitor's capability token (an unguessable UUID).
    // It is only created on first "Continue", so an empty key means a brand-new
    // visitor who must first give their name/email in the start form.
    function getDeviceId() {
        return localStorage.getItem(DEVICE_ID_KEY) || null;
    }

    function createDeviceId() {
        const id = crypto.randomUUID();
        localStorage.setItem(DEVICE_ID_KEY, id);
        return id;
    }

    function clearDeviceId() {
        localStorage.removeItem(DEVICE_ID_KEY);
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
            if (this.id === 'contact-chat') return;

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
    // Chat Widget
    // ============================================
    // Replaces the old contact form. Each visitor gets a private thread keyed
    // by their deviceId. Access is enforced by the Firestore Security Rules in
    // `firestore.rules`.

    const chatWidget = document.getElementById('chat-widget');
    const chatLauncher = document.getElementById('chat-launcher');
    const chatBadge = document.getElementById('chat-badge');
    const chatClose = document.getElementById('chat-close');
    const chatStart = document.getElementById('chat-start');
    const chatStartBtn = document.getElementById('chat-start-btn');
    const chatName = document.getElementById('chat-name');
    const chatEmail = document.getElementById('chat-email');
    const chatLoading = document.getElementById('chat-loading');
    const chatPanel = document.getElementById('chat-panel');
    const chatMessages = document.getElementById('chat-messages');
    const chatInputForm = document.getElementById('chat-input-form');
    const chatInput = document.getElementById('chat-input');

    let chatUnsubscribe = null;
    let chatPinnedToBottom = true;
    let currentChatDeviceId = null;
    let chatVisitorReadAt = null;

    function setLauncherBadge(count) {
        if (!chatBadge) return;
        chatBadge.textContent = count > 99 ? '99+' : String(count);
        chatBadge.hidden = count <= 0;
    }

    function markVisitorRead(deviceId) {
        chatVisitorReadAt = new Date();
        setLauncherBadge(0);
        updateDoc(doc(db, 'conversations', deviceId), { visitorReadAt: serverTimestamp() })
            .catch((error) => {
                console.error('Failed to mark conversation read:', error.code, '-', error.message);
            });
    }

    function scrollChatToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
        chatPinnedToBottom = true;
    }

    function openChat() {
        chatWidget.hidden = false;
        chatLauncher.setAttribute('aria-expanded', 'true');
        if (currentChatDeviceId && !chatPanel.hidden) {
            markVisitorRead(currentChatDeviceId);
        }
        if (!chatPanel.hidden && chatInput) {
            chatInput.focus();
        }
        if (chatMessages.children.length) {
            scrollChatToBottom();
        }
    }

    function closeChat() {
        chatWidget.hidden = true;
        chatLauncher.setAttribute('aria-expanded', 'false');
    }

    function toggleChat() {
        if (chatWidget.hidden) {
            openChat();
        } else {
            closeChat();
        }
    }

    if (chatLauncher) {
        chatLauncher.addEventListener('click', toggleChat);
    }

    const contactChat = document.getElementById('contact-chat');

    if (contactChat) {
        contactChat.addEventListener('click', (e) => {
            e.preventDefault();
            openChat();
            chatWidget.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    if (chatClose) {
        chatClose.addEventListener('click', closeChat);
    }

    function showChatStart() {
        chatLoading.hidden = true;
        chatPanel.hidden = true;
        chatStart.hidden = false;
    }

    function showChatThread() {
        chatLoading.hidden = true;
        chatStart.hidden = true;
        chatPanel.hidden = false;
    }

    function renderTextDivider(text) {
        const divider = document.createElement('div');
        divider.className = 'chat-date-divider';
        divider.textContent = text;
        return divider;
    }

    // Pulls ALL messages at once and renders them oldest-first, grouped by
    // date with one divider per day. Every message is sorted by its timestamp
    // on the client, so the first message is always at the top and the last
    // message - including anything just written - lands at the bottom.
    // Documents without a usable createdAt are sorted to the very top under
    // the "Earlier" divider instead of being dropped.
    function renderAllMessages(snapshot) {
        const oldScrollHeight = chatMessages.scrollHeight;
        const oldScrollTop = chatMessages.scrollTop;
        const wasPinned = chatMessages.scrollHeight - chatMessages.scrollTop - chatMessages.clientHeight < 60;

        const messages = [];
        snapshot.forEach(docSnap => {
            const data = docSnap.data();
            if (!data.text) return;

            const when = toDate(data.createdAt);
            messages.push({
                text: data.text,
                role: data.role,
                when: when,
                timeMs: when ? when.getTime() : -Infinity
            });
        });

        messages.sort((a, b) => a.timeMs - b.timeMs);

        // Unread badge: count owner replies newer than the visitor's last read
        // marker. While the chat is open, new owner replies are read immediately
        // so the badge clears on its own.
        let unreadCount = 0;
        let latestUnread = null;
        messages.forEach(msg => {
            if (msg.role === 'owner' && msg.when && chatVisitorReadAt && msg.when > chatVisitorReadAt) {
                unreadCount++;
                if (!latestUnread || msg.when > latestUnread) {
                    latestUnread = msg.when;
                }
            }
        });

        if (unreadCount > 0 && currentChatDeviceId && !chatWidget.hidden && !chatPanel.hidden) {
            chatVisitorReadAt = latestUnread;
            setLauncherBadge(0);
            updateDoc(doc(db, 'conversations', currentChatDeviceId), { visitorReadAt: latestUnread })
                .catch((error) => {
                    console.error('Failed to mark conversation read:', error.code, '-', error.message);
                });
        } else {
            setLauncherBadge(unreadCount);
        }

        chatMessages.innerHTML = '';
        chatPinnedToBottom = true;

        let lastKey = null;
        messages.forEach(msg => {
            const key = msg.when ? formatDateKey(msg.when) : '';
            if (key !== lastKey) {
                chatMessages.appendChild(msg.when ? renderDateDivider(msg.when) : renderTextDivider('Earlier'));
                lastKey = key;
            }
            chatMessages.appendChild(renderChatMessage(msg.text, msg.role === 'owner', msg.when));
        });

        if (wasPinned) {
            scrollChatToBottom();
        } else {
            chatPinnedToBottom = false;
            chatMessages.scrollTop = oldScrollTop + (chatMessages.scrollHeight - oldScrollHeight);
        }
    }

    function attachChatListener(deviceId) {
        if (chatUnsubscribe) {
            chatUnsubscribe();
        }

        chatUnsubscribe = onSnapshot(
            collection(db, 'conversations', deviceId, 'messages'),
            (snapshot) => renderAllMessages(snapshot),
            (error) => {
                console.error('Chat listener failed:', error.code, '-', error.message);
                showNotification('Could not load the conversation. Refresh and try again.', 'error');
            }
        );
    }

    function openChatThread(deviceId, visitorReadAt) {
        currentChatDeviceId = deviceId;
        chatVisitorReadAt = visitorReadAt || null;
        chatMessages.querySelectorAll('.chat-bubble, .chat-date-divider').forEach(el => el.remove());
        chatPinnedToBottom = true;
        attachChatListener(deviceId);
    }

    // A returning visitor (existing deviceId) has their conversation pulled
    // automatically. Brand-new visitors (no deviceId) start from the form.
    function initChat() {
        const deviceId = getDeviceId();
        if (!deviceId) {
            showChatStart();
            return;
        }

        chatStart.hidden = true;
        chatPanel.hidden = true;
        chatLoading.hidden = false;

        getDoc(doc(db, 'conversations', deviceId))
            .then((snap) => {
                if (!snap.exists()) {
                    clearDeviceId();
                    showChatStart();
                    return;
                }
                showChatThread();
                openChatThread(deviceId, toDate(snap.data().visitorReadAt));
            })
            .catch((error) => {
                console.error('Failed to load conversation:', error.code, '-', error.message);
                showChatStart();
                let hint = 'Please try again.';
                if (error.code === 'permission-denied') {
                    hint = 'Check your Firestore Security Rules and database setup.';
                }
                showNotification('Could not load your conversation. ' + hint, 'error');
            });
    }

    function startChat() {
        const name = chatName.value.trim();
        const email = chatEmail.value.trim();

        if (!name || !email) {
            showNotification('Please enter your name and email', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        const deviceId = getDeviceId() || createDeviceId();
        const conversationRef = doc(db, 'conversations', deviceId);

        chatStart.hidden = true;
        chatPanel.hidden = true;
        chatLoading.hidden = false;

        getDoc(conversationRef)
            .then((snap) => {
                if (snap.exists()) {
                    return setDoc(conversationRef, { name: name, email: email }, { merge: true });
                }
                return setDoc(conversationRef, {
                    name: name,
                    email: email,
                    deviceId: deviceId,
                    browser: getBrowser(),
                    os: getOS(),
                    createdAt: serverTimestamp()
                });
            })
            .then(() => {
                showChatThread();
                openChatThread(deviceId, null);
            })
            .catch((error) => {
                console.error('Failed to open conversation:', error.code, '-', error.message);
                showChatStart();
                let hint = 'Please try again.';
                if (error.code === 'permission-denied') {
                    hint = 'Check your Firestore Security Rules and database setup.';
                }
                showNotification('Something went wrong. ' + hint, 'error');
            });
    }

    function toDate(value) {
        if (!value) return null;
        if (typeof value.toDate === 'function') return value.toDate();
        if (typeof value.seconds === 'number') return new Date(value.seconds * 1000);
        return value instanceof Date ? value : null;
    }

    const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const timeFormat = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' });

    function formatDateKey(when) {
        return when ? dateFormat.format(when) : '';
    }

    function formatTime(when) {
        return when ? timeFormat.format(when) : '';
    }

    function renderDateDivider(when) {
        const divider = document.createElement('div');
        divider.className = 'chat-date-divider';
        divider.textContent = formatDateKey(when);
        return divider;
    }

    function renderChatMessage(text, isOwner, when) {
        if (!text) return null;
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble ' + (isOwner ? 'chat-bubble-owner' : 'chat-bubble-visitor');
        if (when) {
            bubble.dataset.ts = String(when.getTime());
            bubble.dataset.dateKey = formatDateKey(when);
        }

        const body = document.createElement('span');
        body.className = 'chat-bubble-text';
        body.textContent = text;
        bubble.appendChild(body);

        if (when) {
            const time = document.createElement('span');
            time.className = 'chat-bubble-time';
            time.textContent = formatTime(when);
            bubble.appendChild(time);
        }

        return bubble;
    }

    if (chatStartBtn) {
        chatStartBtn.addEventListener('click', startChat);
    }

    if (chatInputForm) {
        chatInputForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const text = chatInput.value.trim();
            if (!text) return;

            const sendBtn = this.querySelector('button[type="submit"]');
            sendBtn.disabled = true;

            addDoc(collection(db, 'conversations', getDeviceId(), 'messages'), {
                text: text,
                role: 'visitor',
                createdAt: serverTimestamp()
            })
                .then(() => {
                    chatInput.value = '';
                    scrollChatToBottom();
                })
                .catch((error) => {
                    console.error('Send failed:', error.code, '-', error.message);
                    let hint = 'Please try again or email me directly.';
                    if (error.code === 'permission-denied') {
                        hint = 'Check your Firestore Security Rules and database setup.';
                    } else if (error.code === 'unavailable' || error.code === 'network-error') {
                        hint = 'Check your connection and the Firebase config in js/firebase-config.js.';
                    }
                    showNotification('Message not sent. ' + hint, 'error');
                })
                .finally(() => {
                    sendBtn.disabled = false;
                    chatInput.focus();
                });
        });
    }

    chatMessages.addEventListener('scroll', () => {
        chatPinnedToBottom = chatMessages.scrollHeight - chatMessages.scrollTop - chatMessages.clientHeight < 60;
    }, { passive: true });

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

        initChat();
    });

})();