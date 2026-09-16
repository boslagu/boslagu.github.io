/**
 * Owner reply admin page.
 * Signs in with Firebase Auth (email/password) to list visitor conversations
 * and post replies. Access is enforced by the Firestore Security Rules in
 * `firestore.rules` (authenticated users get the "owner" role).
 */

import { app, db } from './firebase-config.js';
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js';
import {
    collection,
    doc,
    addDoc,
    serverTimestamp,
    getDocs,
    query,
    orderBy,
    onSnapshot,
    updateDoc,
    getDoc
} from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js';

const auth = getAuth(app);

const authStatus = document.getElementById('auth-status');
const logoutBtn = document.getElementById('logout-btn');
const rulesWarning = document.getElementById('rules-warning');
const loginView = document.getElementById('login-view');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginBtn = document.getElementById('login-btn');
const loginError = document.getElementById('login-error');
const repliesView = document.getElementById('replies-view');
const convoList = document.getElementById('convo-list');
const thread = document.getElementById('thread');
const threadName = document.getElementById('thread-name');
const threadMeta = document.getElementById('thread-meta');
const threadMessages = document.getElementById('thread-messages');
const replyForm = document.getElementById('reply-form');
const replyInput = document.getElementById('reply-input');

let currentUnsubscribe = null;
let currentDeviceId = null;
let ownerReadAtCurrent = null;
let refreshTimer = null;
// deviceId -> Date: conversations this admin session has already viewed.
// Acts as a floor for unread counts so a thread that was opened stays at 0
// for the rest of the session, even before the DB marker write propagates.
const sessionReadMarks = new Map();
// deviceId -> unsubscribe: one live listener per conversation, so list
// badges update the moment a new visitor message arrives (no refresh needed).
const convoListeners = new Map();
// deviceId -> Date: last known ownerReadAt read from the DB for each convo.
const dbReadAtByConvo = new Map();

// ============================================
// Auth
// ============================================

function signIn() {
    loginError.textContent = '';
    const email = loginEmail.value.trim();
    const password = loginPassword.value;

    if (!email || !password) {
        loginError.textContent = 'Enter your email and password.';
        return;
    }

    loginBtn.disabled = true;
    loginBtn.textContent = 'Signing in...';

    signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            console.error('Sign-in failed:', error.code, '-', error.message);
            loginError.textContent = error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password'
                ? 'Invalid credentials.'
                : 'Sign-in failed. Please try again.';
        })
        .finally(() => {
            loginBtn.disabled = false;
            loginBtn.textContent = 'Sign in';
        });
}

function signOutUser() {
    signOut(auth).catch((error) => {
        console.error('Sign-out failed:', error.code, '-', error.message);
    });
}

loginBtn.addEventListener('click', signIn);
loginPassword.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') signIn();
});
logoutBtn.addEventListener('click', signOutUser);

onAuthStateChanged(auth, (user) => {
    if (user) {
        authStatus.textContent = user.email;
        logoutBtn.hidden = false;
        loginView.hidden = true;
        repliesView.hidden = false;
        loadConversations();
        if (refreshTimer) {
            clearInterval(refreshTimer);
        }
        refreshTimer = setInterval(refreshUnreadCounts, 60000);
    } else {
        authStatus.textContent = 'Not signed in';
        logoutBtn.hidden = true;
        loginView.hidden = false;
        repliesView.hidden = true;
        if (refreshTimer) {
            clearInterval(refreshTimer);
            refreshTimer = null;
        }
        stopConvoListeners();
        sessionReadMarks.clear();
        dbReadAtByConvo.clear();
        stopThread();
        ownerReadAtCurrent = null;
        thread.hidden = true;
        convoList.innerHTML = '';
    }
});

// ============================================
// Conversation list
// ============================================

function loadConversations() {
    convoList.innerHTML = '<p class="reply-status">Loading conversations...</p>';

    getDocs(query(collection(db, 'conversations'), orderBy('createdAt', 'desc')))
        .then((snapshot) => {
            if (snapshot.empty) {
                convoList.innerHTML = '<p class="reply-status">No conversations yet.</p>';
                return;
            }
            convoList.innerHTML = '';
            snapshot.forEach((docSnap) => {
                convoList.appendChild(convoItem(docSnap.id, docSnap.data()));
            });
            stopConvoListeners();
            refreshUnreadCounts();
            startConvoListeners();
        })
        .catch((error) => {
            console.error('Failed to load conversations:', error.code, '-', error.message);
            convoList.innerHTML = '<p class="reply-status">Could not load conversations.</p>';
        });
}

function convoItem(deviceId, data) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'convo-item';
    button.dataset.deviceId = deviceId;

    if (deviceId === currentDeviceId) {
        button.classList.add('active');
    }

    const badge = document.createElement('span');
    badge.className = 'convo-badge';
    badge.hidden = true;
    button.appendChild(badge);

    const name = document.createElement('span');
    name.className = 'convo-name';
    name.textContent = data.name || 'Unknown';

    const meta = document.createElement('span');
    meta.className = 'convo-meta';
    meta.textContent = (data.email || '') + (data.createdAt ? ' · ' + formatDate(data.createdAt) : '');

    button.appendChild(name);
    button.appendChild(meta);

    button.addEventListener('click', () => openThread(deviceId, data));
    return button;
}

function updateItemBadge(deviceId, count) {
    const item = convoList.querySelector('[data-device-id="' + deviceId + '"]');
    const badge = item && item.querySelector('.convo-badge');
    if (!badge) return;
    badge.textContent = count > 99 ? '99+' : String(count);
    badge.hidden = count <= 0;
}

// Read floors: the latest timestamp considered "read" for a conversation.
// Persists in this session (Map) AND across sessions (localStorage), so the
// badge stays cleared even if the DB ownerReadAt write is rejected.
const readStorageKey = (deviceId) => 'reply_read_' + deviceId;

function warnRules() {
    if (!rulesWarning) return;
    rulesWarning.textContent = 'Firestore rules are rejecting read-marker updates. Publish the latest firestore.rules in the Firebase console, then reload.';
    rulesWarning.hidden = false;
}

// Returns the effective read floor in ms, or null when nothing has been read.
function readFloor(deviceId, dbReadAt) {
    let ms = dbReadAt ? dbReadAt.getTime() : 0;
    const sessionMark = sessionReadMarks.get(deviceId);
    if (sessionMark && sessionMark.getTime() > ms) ms = sessionMark.getTime();
    const stored = Number(localStorage.getItem(readStorageKey(deviceId)) || 0);
    if (stored > ms) ms = stored;
    return ms || null;
}

function storeReadFloor(deviceId, when) {
    const mark = when ? toDate(when) : new Date();
    sessionReadMarks.set(deviceId, mark);
    localStorage.setItem(readStorageKey(deviceId), String(mark.getTime()));
}

// Counts unread visitor messages (role "visitor", createdAt after the owner's
// last read marker) for every conversation in the list and paints the badges.
// Conversations that were never opened get a baseline marker so old messages
// are not flooded as unread.  The badge for the currently-open thread is left
// alone — the snapshot handler in openThread owns it and is always correct.
function refreshUnreadCounts() {
    if (!auth.currentUser) return;

    const activeDeviceId = currentDeviceId;
    const items = Array.from(convoList.querySelectorAll('.convo-item'));
    Promise.all(items.map((item) => {
        const deviceId = item.dataset.deviceId;
        if (!deviceId || deviceId === activeDeviceId) return Promise.resolve();
        const convoRef = doc(db, 'conversations', deviceId);

        return getDoc(convoRef)
            .then((snap) => {
                const data = snap.data() || {};
                const dbReadAt = toDate(data.ownerReadAt);
                dbReadAtByConvo.set(deviceId, dbReadAt);
                const readAt = readFloor(deviceId, dbReadAt);

                if (!dbReadAt) {
                    updateDoc(convoRef, { ownerReadAt: serverTimestamp() })
                        .catch((error) => {
                            if (error && error.code === 'permission-denied') warnRules();
                            console.warn('Baseline ownerReadAt not saved for', deviceId + ':', error && error.code);
                        });
                }
                if (!readAt) {
                    // First time this admin session sees this conversation:
                    // baseline it as read so history is not shown unread.
                    storeReadFloor(deviceId, new Date());
                }

                return getDocs(collection(db, 'conversations', deviceId, 'messages'))
                    .then((msgSnap) => {
                        let count = 0;
                        msgSnap.forEach((ds) => {
                            const msg = ds.data();
                            const msTime = toDate(msg.createdAt);
                            if (msg.role === 'visitor' && msTime && (!readAt || msTime > readAt)) {
                                count++;
                            }
                        });
                        updateItemBadge(deviceId, count);
                    });
            })
            .catch((error) => {
                console.warn('Unread count failed for', deviceId + ':', error.code, '-', error.message);
            });
    }));
}

// One live listener per conversation: recomputes the list badge instantly
// whenever a message arrives in that thread. The currently-open thread is
// skipped — openThread's snapshot handler owns that badge.
function startConvoListeners() {
    const items = Array.from(convoList.querySelectorAll('.convo-item'));
    items.forEach((item) => {
        const deviceId = item.dataset.deviceId;
        if (!deviceId || convoListeners.has(deviceId)) return;

        const unsubscribe = onSnapshot(
            collection(db, 'conversations', deviceId, 'messages'),
            (snapshot) => {
                if (deviceId === currentDeviceId) return;
                const floorMs = readFloor(deviceId, dbReadAtByConvo.get(deviceId) || null);
                let count = 0;
                snapshot.forEach((ds) => {
                    const msg = ds.data();
                    const msTime = toDate(msg.createdAt);
                    if (msg.role === 'visitor' && msTime && (!floorMs || msTime.getTime() > floorMs)) {
                        count++;
                    }
                });
                updateItemBadge(deviceId, count);
            },
            (error) => {
                console.warn('Conversation listener failed for', deviceId + ':', error.code, '-', error.message);
            }
        );
        convoListeners.set(deviceId, unsubscribe);
    });
}

function stopConvoListeners() {
    convoListeners.forEach((unsubscribe) => unsubscribe());
    convoListeners.clear();
}

async function markOwnerRead(deviceId, readAtTimestamp) {
    storeReadFloor(deviceId, readAtTimestamp);
    updateItemBadge(deviceId, 0);
    const convoRef = doc(db, 'conversations', deviceId);
    await updateDoc(convoRef, { ownerReadAt: readAtTimestamp || serverTimestamp() })
        .then(() => {
            console.log('ownerReadAt saved for', deviceId);
        })
        .catch((error) => {
            if (error && error.code === 'permission-denied') {
                warnRules();
                console.error('ownerReadAt rejected for', deviceId, '- publish the updated firestore.rules in the Firebase console.');
            } else {
                console.error('Failed to mark thread read:', deviceId, '-', error && error.code, error && error.message);
            }
        });
    const freshSnap = await getDoc(convoRef).catch(() => null);
    if (freshSnap && freshSnap.exists()) {
        const fresh = toDate(freshSnap.data().ownerReadAt);
        if (fresh) {
            ownerReadAtCurrent = fresh;
            dbReadAtByConvo.set(deviceId, fresh);
        }
    }
}

// ============================================
// Thread view
// ============================================

async function openThread(deviceId, data) {
    stopThread();
    currentDeviceId = deviceId;
    ownerReadAtCurrent = toDate(data.ownerReadAt);
    await markOwnerRead(deviceId);

    threadName.textContent = data.name || 'Unknown';
    threadMeta.textContent = data.email || '';
    thread.hidden = false;
    threadMessages.innerHTML = '';

    convoList.querySelectorAll('.convo-item').forEach((item) => item.classList.remove('active'));
    const match = Array.from(convoList.children).find((child) => child.dataset.deviceId === deviceId);
    if (match) {
        match.classList.add('active');
    }

    currentUnsubscribe = onSnapshot(
        query(collection(db, 'conversations', deviceId, 'messages'), orderBy('createdAt')),
        async (snapshot) => {
            threadMessages.innerHTML = '';
            let lastDateKey = '';
            let latestUnread = null;

            snapshot.forEach((docSnap) => {
                const msg = docSnap.data();
                const when = toDate(msg.createdAt);
                const dateKey = formatDateKey(when);
                if (dateKey && dateKey !== lastDateKey) {
                    threadMessages.appendChild(dateDivider(when));
                    lastDateKey = dateKey;
                }
                threadMessages.appendChild(bubble(msg.text, msg.role === 'owner', when));

                if (msg.role === 'visitor' && when && ownerReadAtCurrent && when > ownerReadAtCurrent) {
                    if (!latestUnread || when > latestUnread) {
                        latestUnread = when;
                    }
                }
            });

            threadMessages.scrollTop = threadMessages.scrollHeight;

            if (latestUnread) {
                ownerReadAtCurrent = latestUnread;
                await markOwnerRead(deviceId, latestUnread);
            }
        },
        (error) => {
            console.error('Thread listener failed:', error.code, '-', error.message);
        }
    );
}

function stopThread() {
    if (currentUnsubscribe) {
        currentUnsubscribe();
        currentUnsubscribe = null;
    }
    currentDeviceId = null;
    ownerReadAtCurrent = null;
}

// ============================================
// Reply
// ============================================

replyForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const text = replyInput.value.trim();
    if (!text || !currentDeviceId) return;

    const sendBtn = replyForm.querySelector('button[type="submit"]');
    sendBtn.disabled = true;

    addDoc(collection(db, 'conversations', currentDeviceId, 'messages'), {
        text: text,
        role: 'owner',
        createdAt: serverTimestamp()
    })
        .then(() => {
            replyInput.value = '';
        })
        .catch((error) => {
            console.error('Reply failed:', error.code, '-', error.message);
            let hint = 'Please try again.';
            if (error.code === 'permission-denied') {
                hint = 'Check your Firestore Security Rules and database setup.';
            }
            showThreadError('Reply not sent. ' + hint);
        })
        .finally(() => {
            sendBtn.disabled = false;
            replyInput.focus();
        });
});

function showThreadError(message) {
    const status = document.createElement('div');
    status.className = 'reply-status';
    status.style.color = 'var(--color-error)';
    status.textContent = message;
    thread.appendChild(status);
    setTimeout(() => status.remove(), 4000);
}

// ============================================
// Helpers
// ============================================

function toDate(value) {
    if (!value) return null;
    if (typeof value.toDate === 'function') return value.toDate();
    if (typeof value.seconds === 'number') return new Date(value.seconds * 1000);
    return value instanceof Date ? value : null;
}

const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
const dividerFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
const timeFormat = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' });

function formatDate(value) {
    const when = toDate(value);
    return when ? dateFormat.format(when) : '';
}

function formatDateKey(when) {
    return when ? dividerFormat.format(when) : '';
}

function dateDivider(when) {
    const div = document.createElement('div');
    div.className = 'chat-date-divider';
    div.textContent = formatDateKey(when);
    return div;
}

function bubble(text, isOwner, when) {
    const el = document.createElement('div');
    el.className = 'chat-bubble ' + (isOwner ? 'chat-bubble-owner' : 'chat-bubble-visitor');

    const body = document.createElement('span');
    body.className = 'chat-bubble-text';
    body.textContent = text;
    el.appendChild(body);

    if (when) {
        const time = document.createElement('span');
        time.className = 'chat-bubble-time';
        time.textContent = timeFormat.format(when);
        el.appendChild(time);
    }

    return el;
}