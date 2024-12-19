import React, { useState, useEffect } from "react";
import { storage } from "../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

// 画像とキャプションを格納するためのインターフェース
interface ImageWithCaption {
  url: string;
  caption: string;
}

const Sell = () => {
  const [images, setImages] = useState<ImageWithCaption[]>([]); // 画像とキャプションのリスト
  const [selectedImage, setSelectedImage] = useState<string>(""); // 選択された画像のURL
  const [caption, setCaption] = useState<string>(""); // キャプションのテキスト

  // Firebase Storage から指定フォルダ内の画像を取得
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Firebase Storage の「supply-list」フォルダを参照
        const imagesRef = ref(
          storage,
          "gs://shopping-app-75095.firebasestorage.app/supply-list/"
        );

        // フォルダ内のアイテムを取得
        const result = await listAll(imagesRef);

        if (result.items.length === 0) {
          console.log("フォルダ内にアイテムがありません。");
        } else {
          console.log("取得したアイテム:", result.items);
        }

        // 各画像のダウンロードURLを取得
        const imageList = await Promise.all(
          result.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return { url, caption: "" }; // キャプションは初期状態では空
          })
        );

        setImages(imageList); // 取得した画像リストを状態にセット
      } catch (error) {
        console.error("画像の取得エラー:", error); // エラー時のデバッグ
      }
    };

    fetchImages();
  }, []);

  // 画像をクリックしたときの処理
  const handleImageClick = (url: string) => {
    setSelectedImage(url); // 選択された画像のURLをセット
    const selectedImage = images.find((image) => image.url === url);
    if (selectedImage) {
      setCaption(selectedImage.caption);
    }
  };

  // キャプション入力を管理
  const handleCaptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(event.target.value); // キャプションを更新
  };

  // キャプションを保存
  const handleCaptionSave = () => {
    setImages((prevImages) =>
      prevImages.map((image) =>
        image.url === selectedImage ? { ...image, caption } : image
      )
    );
    setCaption(""); // キャプション入力欄をクリア
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>画像一覧</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {images.length === 0 ? (
          <p>画像がありません。</p>
        ) : (
          images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`Storage Image ${index}`}
              onClick={() => handleImageClick(image.url)}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                margin: "10px",
                cursor: "pointer",
                border: selectedImage === image.url ? "2px solid blue" : "none",
              }}
            />
          ))
        )}
      </div>

      {selectedImage && (
        <div style={{ marginTop: "20px" }}>
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
              style={{ width: "300px", padding: "5px", marginRight: "10px" }}
            />
            <button
              onClick={handleCaptionSave}
              style={{
                padding: "5px 10px",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              保存
            </button>
          </div>
        </div>
      )}

      <div style={{ marginTop: "40px" }}>
        <h2>キャプション付き画像一覧</h2>
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <img
              src={image.url}
              alt={`Image ${index}`}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                marginRight: "10px",
              }}
            />
            <span>{image.caption || "キャプションなし"}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sell;
