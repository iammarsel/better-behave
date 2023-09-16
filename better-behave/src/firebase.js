// firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Import the config 
import { firebaseConfig } from './firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Export auth
export { auth };