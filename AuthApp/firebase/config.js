import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; 
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyActeWwdu2ZsezhoDmZS9cXvCy3VC-3b6I",
  authDomain: "auth-fd40c.firebaseapp.com",
  projectId: "auth-fd40c",
  storageBucket: "auth-fd40c.firebasestorage.app",
  messagingSenderId: "139247990861",
  appId: "1:139247990861:web:0f83ad7be864ca385e0404"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);