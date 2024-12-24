import React, { useState, useEffect } from "react";
import { storage } from "../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { saveCaptionToFirestore } from "./save"; // キャプション保存関数をインポート

interface ImageWithCaption {
  url: string;
  caption: string;
}

const Sell: React.FC = () => {
  const [images, setImages] = useState<ImageWithCaption[]>([]);

  // Firebase Storage から画像を取得
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesRef = ref(
          storage,
          "gs://shopping-app-75095.firebasestorage.app/supply-list/"
        );
        const result = await listAll(imagesRef);
        const imageList = await Promise.all(
          result.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return { url, caption: "" };
          })
        );
        setImages(imageList);
      } catch (error) {
        console.error("画像の取得エラー:", error);
      }
    };

    fetchImages();
  }, []);

  // キャプションの変更を管理
  const handleCaptionChange = (index: number, newCaption: string) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index].caption = newCaption;
      return updatedImages;
    });
  };

  // キャプションを保存
  const handleSaveCaption = (index: number) => {
    const { url, caption } = images[index];
    saveCaptionToFirestore(index, url, caption);
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "bisque", // 背景色を設定
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        marginTop: "5rem", // 上部に余白を追加
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {images.length === 0 ? (
          <p>画像がありません。</p>
        ) : (
          images.map((image, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                margin: "10px",
                textAlign: "center",
                width: "200px",
                backgroundColor: "#fff",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={image.url}
                alt={`Storage Image ${index}`}
                style={{
                  width: "100%",
                  height: "auto", // 高さを自動調整
                  objectFit: "contain", // 画像全体を収める
                  marginBottom: "10px",
                }}
              />
              <input
                type="text"
                value={image.caption}
                onChange={(e) => handleCaptionChange(index, e.target.value)}
                placeholder="キャプションを入力"
                style={{
                  width: "100%",
                  padding: "5px",
                  marginBottom: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
              <button
                onClick={() => handleSaveCaption(index)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#007BFF",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                保存
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sell;
