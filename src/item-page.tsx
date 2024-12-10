import React from "react";
import "./item-page.css";
import { Link } from "react-router-dom";

const SupplyList: React.FC = () => {
  return (
    <div className="list">
      <Link to="/" className="home-link">
        Happy shopping
      </Link>
      <div className="supply">
        <h1>商品の置き場所</h1>
        <p>ここに置くよ</p>
      </div>
    </div>
  );
};

export default SupplyList;
