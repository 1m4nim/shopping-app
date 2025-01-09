import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import Scroll from "./scroll-auto";
import { NewpageButton } from "./newpage-button";
import styles from "./App.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import Supply from "./item-page";
import HeaderDesign from "./header";
import Login from "./login";
import Sell from "./sell";
import Help from "./help";
import "antd/dist/reset.css";
import ItemPage from "./item-page";
import UploadImage from "./UploadImage";
import ViewImages from "./ViewImages";

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

        <Route path="/login" element={<Login />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/help" element={<Help />} />
        <Route path="/item-Page" element={<ItemPage />} />
        <Route path="/UploadImage" element={<UploadImage />} />
        <Route path="/ViewImage" element={<ViewImages />} />
      </Routes>
    </Router>
  );
}
