import { useEffect, useState } from "react";
import { signInWithPopup, signOut, User } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import "./AuthComponent.css";

type AuthComponentProps = {
  onUserChange: (user: User | null) => void;
};

const AuthComponent: React.FC<AuthComponentProps> = ({ onUserChange }) => {
  const [user, setUser] = useState<User | null>(null);

  // ログイン状態の監視
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      onUserChange(authUser); // ログイン状態の変更を親コンポーネントに通知
    });

    // アンマウント時に監視解除
    return () => {
      unsubscribe();
    };
  }, [onUserChange]);

  // ログイン
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("ログイン成功", result.user);
    } catch (error) {
      console.error("ログインエラー", error);
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
