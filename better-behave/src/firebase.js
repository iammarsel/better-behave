import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { firebaseConfig } from './firebaseConfig';

// TODO: Replace the following with your app's Firebase project configuration

const firebaseApp = firebase.initializeApp(firebaseConfig);


export const auth = firebaseApp.auth();
export const db = firebaseApp.firestore();
export default firebaseApp;// firebase.js
