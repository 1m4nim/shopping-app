import { useEffect, useState } from "react";
import { signInWithPopup, signOut, User } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import "./AuthComponent.css";

type AuthComponentProps = {
  onUserChange: (user: User | null) => void;
};

const AuthComponent: React.FC<AuthComponentProps> = ({ onUserChange }) => {
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      onUserChange(authUser);
    });
    return () => {
      unsubscribe();
    };
  }, [onUserChange]);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("ログイン成功", result.user);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage("ログインに失敗しました。もう一度お試しください。");
      console.error("ログインエラー", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage("ログアウトに失敗しました。");
      console.error("ログアウトエラー:", error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="ユーザーアイコン"
              className="user-icon"
            />
          )}
          <p className="not-login">
            ログインユーザー: {user.displayName || "名無しのユーザー"}
          </p>
          <button className="login-button" onClick={handleSignOut}>
            ログアウト
          </button>
          {/* ログイン時のみ表示される内容 */}
          <div className="logged-in-content">
            <h2 style={{ color: "black" }}>
              ログイン時専用の情報は「販売をはじめる」をみてね
            </h2>
          </div>
        </div>
      ) : (
        <div>
          <p className="login">ログインしていません</p>
          <button className="login-button" onClick={handleSignIn}>
            ログイン
          </button>
        </div>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default AuthComponent;
