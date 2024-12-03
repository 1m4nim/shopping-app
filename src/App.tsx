import "./App.css";
import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

const App: React.FC = () => {
  const [onOff, setOnOff] = useState<boolean>(true);

  return (
    <div>
      <button onClick={() => setOnOff(!onOff)}>
        {onOff ? "タイトルを非表示" : "タイトルを表示"}
      </button>
      <CSSTransition in={onOff} timeout={1000} classNames="fade" unmountOnExit>
        <h1 className="welcome">ようこそ 夢の国へ</h1>
      </CSSTransition>
      <LikeButton />
    </div>
  );
};

const LikeButton: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <span className="likeButton" onClick={handleClick}>
      💛{count}
    </span>
  );
};

export default App;
