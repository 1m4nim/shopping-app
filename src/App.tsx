import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import Scroll from "./scroll-auto";
import { NewpageButton } from "./newpage-button";
import styles from "./App.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SupplyList from "./item-page";
import HeaderDesign from "./header";

import "antd/dist/reset.css";

export default function App() {
  return (
    <Router>
      <HeaderDesign />
      <Routes>
        <Route
          path="/"
          element={
            <div className={styles.container}>
              <h1 className={styles.title}>Happy shopping</h1>
              <p className={styles.description}>
                ここから始まるHappyなお買い物
              </p>
              <div className={styles.newpage}>
                {/* <Scroll /> */}
                <NewpageButton />
              </div>
            </div>
          }
        />
        <Route path="/item-page" element={<SupplyList />} />
      </Routes>
    </Router>
  );
}
