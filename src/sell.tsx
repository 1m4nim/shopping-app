import React, { useEffect, useState } from "react";
import { getImagesFromStorage } from "../firebaseStorage";
import { saveSelectedImageToFirestore } from "../firebaseFirestore";
import "./sell.css";

const Sell = () => {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Firebase Storageから画像を取得
  useEffect(() => {
    const fetchImages = async () => {
      const imageUrls = await getImagesFromStorage(
        "gs://shopping-app-75095.firebasestorage.app/supply-list"
      ); // フォルダ名を指定
      setImages(imageUrls);
    };

    fetchImages();
  }, []);

  // 画像選択時の処理をする
  const handleImageSelect = (url: string) => {
    setSelectedImage(url);
    setCaption("");
  };

  // フォーム送信時の処理をする
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) return alert("画像を選択してください");
    if (!caption) return alert("キャプションを入力してください");

    setIsSubmitting(true);

    try {
      // Firestoreに保存
      await saveSelectedImageToFirestore(selectedImage, caption);
      alert("画像とキャプションが保存されました！");
      setSelectedImage(null); // 選択状態をリセット
      setCaption(""); // キャプションリセット
    } catch (error) {
      console.error("保存に失敗しました:", error);
      alert("保存に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="heading">画像を選択し、キャプションを入力してください</h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {images.map((url, index) => (
          <div key={index} style={{ textAlign: "center" }}>
            <img
              src={url}
              alt={`Image ${index + 1}`}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                cursor: "pointer",
              }}
              onClick={() => handleImageSelect(url)}
            />
            <button className="select" onClick={() => handleImageSelect(url)}>
              この画像を選択
            </button>
          </div>
        ))}
      </div>

      {/* キャプション入力フォーム */}
      {selectedImage && (
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <h2 className="picture">選択された画像:</h2>
          <img
            src={selectedImage}
            alt="Selected"
            style={{ width: "300px", marginBottom: "10px" }}
          />
          <div>
            <label
              className="caption"
              style={{ display: "block", marginBottom: "5px" }}
            >
              キャプションを入力:
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="キャプションを入力してください"
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{ padding: "10px 20px" }}
            className=""
          >
            {isSubmitting ? "保存中..." : "保存する"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Sell;
