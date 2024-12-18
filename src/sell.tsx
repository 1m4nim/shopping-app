import React, { useState, useEffect } from "react";
import { getImagesFromStorage } from "../firebaseStorage"; // Firebase Storageから画像を取得する関数
import { saveSelectedImageToFirestore } from "../firebaseFirestore"; // Firestoreに保存する関数
import "./sell.css"; // スタイルシート（必要に応じて）

const Sell = () => {
  // 状態管理
  const [images, setImages] = useState<string[]>([]); // Firebase Storageから取得した画像URL
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // 選択した画像URL
  const [caption, setCaption] = useState<string>(""); // キャプション
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // フォームの送信中かどうか

  // Firebase Storageから画像を取得
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageUrls = await getImagesFromStorage("supply-list"); // 画像URLを取得
        setImages(imageUrls);
      } catch (error) {
        console.error("画像の取得に失敗しました:", error);
      }
    };
    fetchImages();
  }, []);

  // 画像選択時の処理
  const handleImageSelect = (url: string) => {
    setSelectedImage(url); // 選択した画像URLを設定
    setCaption(""); // キャプションをリセット
  };

  // フォーム送信時の処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 画像とキャプションが選択されているか確認
    if (!selectedImage) {
      return alert("画像を選択してください");
    }
    if (!caption) {
      return alert("キャプションを入力してください");
    }

    setIsSubmitting(true); // 送信中の状態に変更

    try {
      // Firestoreに選択した画像とキャプションを保存
      await saveSelectedImageToFirestore(selectedImage, caption);
      alert("画像とキャプションが保存されました！");
      setSelectedImage(null); // 選択状態をリセット
      setCaption(""); // キャプションをリセット
    } catch (error) {
      console.error("保存に失敗しました:", error);
      alert("保存に失敗しました");
    } finally {
      setIsSubmitting(false); // 送信状態を解除
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="heading">画像を選択し、キャプションを入力してください</h1>

      {/* 画像一覧の表示 */}
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
              onClick={() => handleImageSelect(url)} // 画像クリック時に選択
            />
            <button
              className="select"
              onClick={() => handleImageSelect(url)} // 画像選択ボタン
            >
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
              onChange={(e) => setCaption(e.target.value)} // キャプションの更新
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
            disabled={isSubmitting} // 送信中はボタンを無効化
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            {isSubmitting ? "保存中..." : "保存する"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Sell;
