import React from "react";
import "./header.css";

const HeaderDesign: React.FC = () => {
  return (
    <div>
      <div className="left">Happy shopping</div>
      <div className="summary">
        <div className="band">販売をはじめる</div>
        <div className="band">ヘルプ</div>
        <div className="band">ログイン</div>
      </div>
    </div>
  );
};
export default HeaderDesign;
