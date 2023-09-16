

import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqmqvK57gWHj83JNaT4ZEfBM8-BWw9xS0",
  authDomain: "shellhacks-7e288.firebaseapp.com",
  projectId: "shellhacks-7e288",
  storageBucket: "shellhacks-7e288.appspot.com",
  messagingSenderId: "319061767285",
  appId: "1:319061767285:web:25cffb3d6a6407219d343c",
  measurementId: "G-1GWJK6H28C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//const db = getFirestore(app)
export {auth};