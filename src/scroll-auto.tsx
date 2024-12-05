import React from "react";
import { Carousel, Image } from "antd";
import "./scroll-auto.css";

const Scroll: React.FC = () => (
  <Carousel
    autoplay
    autoplaySpeed={3000}
    dotPosition="bottom"
    pauseOnDotsHover={false}
    slickGoTo={0}
  >
    <div className="carousel-slide">
      <div className="image-container">
        <Image
          src="/kuchibeni.png"
          preview={true}
          style={{ width: "150px", height: "auto" }}
          className="carousel-image"
        />
        <Image
          src="/makeup_cheek.png"
          preview={true}
          style={{ width: "150px", height: "auto" }}
          className="carousel-image"
        />
        <Image
          src="/makeup_eyeshadow.png"
          preview={true}
          style={{ width: "150px", height: "auto" }}
          className="carousel-image"
        />
        <Image
          src="/makeup_manicure.png"
          preview={true}
          style={{ width: "150px", height: "auto" }}
          className="carousel-image"
        />
      </div>
    </div>
  </Carousel>
);

export default Scroll;
