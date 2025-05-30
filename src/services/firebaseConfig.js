import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDDlzZjfegV4a7AYJ-eRmf8sOYsO2qoATE",
  authDomain: "primerlogin-4d4ee.firebaseapp.com",
  projectId: "primerlogin-4d4ee",
  storageBucket: "primerlogin-4d4ee.firebasestorage.app",
  messagingSenderId: "423458374673",
  appId: "1:423458374673:web:ea723c3b65c0bcfab8ddb0",
  measurementId: "G-JPC4DHEWE0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
