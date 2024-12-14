import React, { useState, useEffect } from "react";
import { signInWithPopup, signOut, User } from "firebase/auth"; // User 型をインポート
import { auth, googleProvider } from "./firebase";
import "./AuthComponent.css";

const AuthComponent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null); // ログイン状態を User | null に設定

  // ログイン状態の監視
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser); // authUser は User | null の型
    });

    // アンマウント時に監視解除
    return () => {
      unsubscribe();
    };
  }, []);

  // ログイン
  const handleSignIn = async () => {
    try {
      // Googleログインポップアップを表示
      const result = await signInWithPopup(auth, googleProvider);
      console.log("ログイン成功", result.user); // ログイン成功時の処理
    } catch (error) {
      console.error("ログインエラー", error); // エラーハンドリング
    }
  };

  // ログアウト
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("ログアウトエラー:", error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p className="not-login">
            ログインユーザー: {user.displayName || "名無しのユーザー"}
          </p>
          <button className="login-button" onClick={handleSignOut}>
            ログアウト
          </button>
        </div>
      ) : (
        <div>
          <p className="login">ログインしていません</p>
          <button className="login-button" onClick={handleSignIn}>
            ログイン
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthComponent;
