import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAR8tptvuuMRL-JaE6SJMaugsdHQJ67NqU",
  authDomain: "shopping-app-75095.firebaseapp.com",
  projectId: "shopping-app-75095",
  storageBucket: "shopping-app-75095.firebasestorage.app",
  messagingSenderId: "1035502928982",
  appId: "1:1035502928982:web:4cbe3dbaeb947c5c4c27f7",
  measurementId: "G-3PQC234XM4",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export const storage = getStorage(app);
