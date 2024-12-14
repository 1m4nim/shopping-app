// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAR8tptvuuMRL-JaE6SJMaugsdHQJ67NqU",
  authDomain: "shopping-app-75095.firebaseapp.com",
  projectId: "shopping-app-75095",
  storageBucket: "shopping-app-75095.firebasestorage.app",
  messagingSenderId: "1035502928982",
  appId: "1:1035502928982:web:4cbe3dbaeb947c5c4c27f7",
  measurementId: "G-3PQC234XM4",
};

// Firebase アプリを初期化
const app = initializeApp(firebaseConfig);

// 認証をセットアップ
export const auth = getAuth(app);

// Google 認証プロバイダをセットアップ
export const googleProvider = new GoogleAuthProvider();
