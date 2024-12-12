import React, { useState } from "react";
import "./header.css";

const HeaderDesign: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <div className="left">Happy shopping</div>

      <div className="summary">
        <div className="band">販売をはじめる</div>
        <div className="band">ヘルプ</div>
        <div className="band">ログイン</div>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`menu ${menuOpen ? "active" : ""}`}>
        <div className="band" onClick={toggleMenu}>
          販売をはじめる
        </div>
        <div className="band" onClick={toggleMenu}>
          ヘルプ
        </div>
        <div className="band" onClick={toggleMenu}>
          ログイン
        </div>
      </div>
    </div>
  );
};

export default HeaderDesign;
