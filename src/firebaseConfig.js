import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB4QvI_ICl9Z7yPBydslk3BM3-NT-y7hU4",
    authDomain: "taskmind-b494c.firebaseapp.com",
    projectId: "taskmind-b494c",
    storageBucket: "taskmind-b494c.appspot.com",
    messagingSenderId: "504017335257",
    appId: "1:504017335257:web:fa390b267fb3cb4dd95fc8"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { app, db };
