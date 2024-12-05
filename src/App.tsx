import React from "react";
import App from "./App"; // named import
import { NewpageButton } from "./newpage-button";
import styles from "./App.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Happy shopping</h1>
      <p className={styles.description}>ここから始まるHappyなお買い物</p>
      <div className={styles.newpage}>
        <App />
        <NewpageButton />
      </div>
    </div>
  );
}
