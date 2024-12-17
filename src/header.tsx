import React, { useEffect, useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";

const HeaderDesign: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const auth = getAuth();

  useEffect(() => {
    // 認証状態を監視
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div>
      <div className="top-bar">
        {user ? (
          <span>ログイン中: {user.displayName || "ユーザー"}</span>
        ) : (
          <span>ログインしてないよ！</span>
        )}
      </div>

      <div className="left">
        <a href="/">Happy shopping</a>
      </div>

      <div className="summary">
        <Link to="/sell" className="band">
          販売をはじめる
        </Link>
        <Link to="/help" className="band">
          ヘルプ
        </Link>
        {user ? (
          <button className="band" onClick={handleLogout}>
            ログアウト
          </button>
        ) : (
          <Link to="/login" className="band">
            ログイン
          </Link>
        )}
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`menu ${menuOpen ? "active" : ""}`}>
        <Link to="/sell" className="band" onClick={toggleMenu}>
          販売をはじめる
        </Link>
        <Link to="/help" className="band" onClick={toggleMenu}>
          ヘルプ
        </Link>
        {user ? (
          <button
            className="band"
            onClick={() => {
              toggleMenu();
              handleLogout();
            }}
          >
            ログアウト
          </button>
        ) : (
          <Link to="/login" className="band" onClick={toggleMenu}>
            ログイン
          </Link>
        )}
      </div>
    </div>
  );
};

export default HeaderDesign;
