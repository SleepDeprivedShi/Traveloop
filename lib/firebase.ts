import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBqz_A2gZKwCQMw80UIQkqF38t8vFbFuyA",
  authDomain: "traveloop-f1f86.firebaseapp.com",
  projectId: "traveloop-f1f86",
  storageBucket: "traveloop-f1f86.firebasestorage.app",
  messagingSenderId: "599180296354",
  appId: "1:599180296354:web:f0a41d5cfc500c501857fb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);