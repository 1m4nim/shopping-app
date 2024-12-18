import React, { useState, useEffect } from "react";
import { storage } from "../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

// 画像とそのキャプションを格納するインターフェース
interface ImageWithCaption {
  url: string;
  caption: string;
}

const Sell = () => {
  const [images, setImages] = useState<ImageWithCaption[]>([]); // 画像とキャプションのリスト
  const [selectedImage, setSelectedImage] = useState<string>(""); // 選択された画像のURL
  const [caption, setCaption] = useState<string>(""); // 現在入力中のキャプション

  // Firebase Storage から画像を取得
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesRef = ref(storage, "shopping-app/supply-list/");
        const result = await listAll(imagesRef);

        // 取得した画像のURLと空のキャプションをセット
        const imageList: ImageWithCaption[] = await Promise.all(
          result.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return { url, caption: "" }; // 初期キャプションは空
          })
        );
        setImages(imageList);
      } catch (error) {
        console.error("画像の取得に失敗しました:", error);
      }
    };

    fetchImages();
  }, []);

  // 画像がクリックされた時にキャプションを設定
  const handleImageClick = (url: string) => {
    setSelectedImage(url);
    const selectedImage = images.find((image) => image.url === url);
    if (selectedImage) {
      setCaption(selectedImage.caption); // 既存のキャプションを表示
    }
  };

  // キャプションの変更を管理
  const handleCaptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(event.target.value);
  };

  // キャプションを保存
  const handleCaptionSave = () => {
    setImages((prevImages) =>
      prevImages.map((image) =>
        image.url === selectedImage ? { ...image, caption } : image
      )
    );
    setCaption(""); // 保存後、入力フィールドをリセット
  };

  return (
    <div>
      <h1>画像一覧</h1>
      <div>
        {images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Storage Image ${index}`}
            onClick={() => handleImageClick(image.url)}
            style={{
              width: "150px",
              margin: "10px",
              cursor: "pointer",
              border: selectedImage === image.url ? "2px solid blue" : "none",
            }}
          />
        ))}
      </div>

      {selectedImage && (
        <div>
          <h3>選択された画像:</h3>
          <img
            src={selectedImage}
            alt="選択された画像"
            style={{ width: "300px", margin: "20px 0" }}
          />
          <div>
            <h4>キャプション:</h4>
            <input
              type="text"
              value={caption}
              onChange={handleCaptionChange}
              placeholder="キャプションを入力"
              style={{ width: "300px", padding: "5px" }}
            />
            <button onClick={handleCaptionSave} style={{ marginLeft: "10px" }}>
              保存
            </button>
          </div>
        </div>
      )}

      <div>
        <h2>キャプション付き画像一覧</h2>
        {images.map((image, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <img
              src={image.url}
              alt={`Image ${index}`}
              style={{ width: "150px", marginRight: "10px" }}
            />
            <span>{image.caption || "キャプションなし"}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sell;
