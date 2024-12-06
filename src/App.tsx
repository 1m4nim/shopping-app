import React from "react";
import ImageCarousel from "./scroll-auto";
import { NewpageButton } from "./newpage-button";
import styles from "./App.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Happy shopping</h1>
      <p className={styles.description}>ここから始まるHappyなお買い物</p>
      <div className={styles.newpage}>
        <ImageCarousel />
        <NewpageButton />
      </div>
    </div>
  );
}
