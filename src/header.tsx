import React, { useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";

const HeaderDesign: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
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
        <Link to="/login" className="band">
          ログイン
        </Link>
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
        <Link to="/login" className="band" onClick={toggleMenu}>
          ログイン
        </Link>
      </div>
    </div>
  );
};

export default HeaderDesign;
