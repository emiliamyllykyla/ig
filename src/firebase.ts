import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB0cg5eHMWkm23ezMcSyZwLy-xFktRnRrk",
  authDomain: "inspirationgram-e66c2.firebaseapp.com",
  projectId: "inspirationgram-e66c2",
  storageBucket: "inspirationgram-e66c2.appspot.com",
  messagingSenderId: "138274501194",
  appId: "1:138274501194:web:8b528d98e2a04e2bf4acb3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
