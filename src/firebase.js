import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAWehR9lCtqynS7-SWXpK6HWc4HnzPIZA",
  authDomain: "chat-fe75b.firebaseapp.com",
  projectId: "chat-fe75b",
  storageBucket: "chat-fe75b.appspot.com",
  messagingSenderId: "217136957251",
  appId: "1:217136957251:web:886a3aafb77f105779d1f6",
  measurementId: "G-X1JEF79PW7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
