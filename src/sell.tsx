import { useState, useEffect } from "react";
import { storage } from "../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { saveCaptionToFirestore } from "./save"; // インポート

interface ImageWithCaption {
  url: string;
  caption: string;
}

const Sell = () => {
  const [images, setImages] = useState<ImageWithCaption[]>([]);

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
        setImages(imageList); // 画像の状態を更新
      } catch (error) {
        console.error("画像の取得エラー:", error);
      }
    };

    fetchImages(); // コンポーネントのマウント時に画像を取得
  }, []); // 初回のみ実行

  const handleCaptionChange = (index: number, newCaption: string) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index].caption = newCaption;
      return updatedImages;
    });
  };

  const handleSaveCaption = (index: number) => {
    const { url, caption } = images[index];
    saveCaptionToFirestore(index, url, caption); // キャプションをFirestoreに保存
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
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
              }}
            >
              <img
                src={image.url}
                alt={`Storage Image ${index}`}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
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
