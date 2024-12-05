import React from "react";
import Scroll from "./scroll-auto";
import { NewpageButton } from "./newpage-button";
import styles from "./App.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Happy shopping</h1>
      <p className={styles.description}>ここから始まるHappyなお買い物</p>
      <div className={styles.newpage}>
        <Scroll />
        <NewpageButton />
      </div>
    </div>
  );
}
