// src/firebase.js
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAnuwaFi0h1IJoVFxb2HARnwHAPpQSidEs',
  authDomain: 'chatapp-e78ef.firebaseapp.com',
  projectId: 'chatapp-e78ef',
  storageBucket: 'chatapp-e78ef.appspot.com',
  messagingSenderId: '504122284507',
  appId: '1:504122284507:web:aaeb2ddf74464d49826ffe',
  measurementId: 'G-D735NDMXDD',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
auth.languageCode = 'en';        

setPersistence(auth, browserLocalPersistence).catch(console.error);

export const provider = new GoogleAuthProvider();

// ----- Firestore -----
export const db = getFirestore(app);