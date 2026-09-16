/**
 * Firebase Configuration
 *
 * Replace the placeholder values below with your Firebase project's web app
 * config, found in the Firebase console under: Project Settings > Your apps.
 *
 * IMPORTANT: These values are PUBLIC by design. They identify your client app
 * but are NOT secrets - anyone can read them from the deployed page. Your data
 * stays safe because of the Firestore Security Rules in `firestore.rules`.
 * NEVER commit service-account / Admin SDK private keys to this repository.
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: 'AIzaSyDnu5LCL1GThWHUFO4e_1KDt4K2ekY9-MY',
    authDomain: 'portfolio-ad42b.firebaseapp.com',
    projectId: 'portfolio-ad42b',
    storageBucket: 'portfolio-ad42b.firebasestorage.app',
    messagingSenderId: '28098097993',
    appId: '1:28098097993:web:01ea1b49eac762a70fa098',
    measurementId: 'G-1PSYGESHDG'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };