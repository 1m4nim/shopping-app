// App.tsx
import React from "react";
import { Carousel } from "antd";
import "antd/dist/reset.css";

const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

export const App: React.FC = () => (
  <Carousel autoplay={true}>
    <div>
      <h3 style={contentStyle}>1</h3>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
);

// NewpageButton.tsx (名前付きエクスポート)
export const NewpageButton = () => {
  return <button>New Page</button>;
};