import React from "react";
import { Carousel, Image } from "antd";

const Scroll: React.FC = () => (
  <Carousel autoplay infinite>
    <div className="item-preview">
      <div className="carousel-slide">
        <Image src="/kuchibeni.png" preview={true} />
        <Image src="/makeup_cheek.png" preview={true} />
        <Image src="/makeup_eyeshadow.png" preview={true} />
        <Image src="/makeup_manicure.png" preview={true} />
      </div>
    </div>
  </Carousel>
);

export default Scroll;
