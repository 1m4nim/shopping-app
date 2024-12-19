import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // GoogleAuthProvider をインポート

const firebaseConfig = {
  apiKey: "AIzaSyAR8tptvuuMRL-JaE6SJMaugsdHQJ67NqU",
  authDomain: "shopping-app-75095.firebaseapp.com",
  projectId: "shopping-app-75095",
  storageBucket: "shopping-app-75095.appspot.com",
  messagingSenderId: "1035502928982",
  appId: "1:1035502928982:web:4cbe3dbaeb947c5c4c27f7",
  measurementId: "G-3PQC234XM4",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app); // auth を追加してエクスポート

// Google認証プロバイダーのインスタンスを作成
export const googleProvider = new GoogleAuthProvider();
