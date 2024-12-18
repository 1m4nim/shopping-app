// Sell.tsx
import React, { useState, useEffect } from "react";
import { db, storage } from "../firebaseConfig"; // firebaseConfigからインポート
import { ref, getDownloadURL } from "firebase/storage"; // Firebase StorageからURLを取得
import { collection, query, getDocs } from "firebase/firestore"; // Firestoreからデータを取得

interface ImageData {
  caption: string;
  imageUrl: string;
  downloadURL: string;
}

const Sell = () => {
  const [images, setImages] = useState<ImageData[]>([]); // 画像URLを格納するための状態
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const q = query(collection(db, "posts"));
        const querySnapshot = await getDocs(q);
        const imageData: ImageData[] = [];

        // Firestoreからデータを取得し、画像URLを取得
        querySnapshot.forEach(async (doc) => {
          const data = doc.data();
          const imageUrl = data.imageUrl; // Firestoreから保存された画像URLを取得

          // 画像のURLがStorageに格納されている場合
          if (imageUrl) {
            try {
              const imageRef = ref(storage, imageUrl); // gs:// のパスをそのまま渡す
              const downloadURL = await getDownloadURL(imageRef);

              imageData.push({
                caption: data.caption || "",
                imageUrl: data.imageUrl || "",
                downloadURL,
              });
            } catch (err) {
              const error = err as Error;
              setError(`画像の取得に失敗しました: ${error.message}`);
            }
          }
        });

        setImages(imageData); // 画像データを状態に設定
      } catch (err) {
        const error = err as Error;
        setError(`画像データの取得に失敗しました: ${error.message}`);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h2>画像の一覧</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        {images.length === 0 ? (
          <p>画像がありません。</p>
        ) : (
          images.map((image, index) => (
            <div key={index}>
              <img
                src={image.downloadURL}
                alt={`image-${index}`}
                style={{ width: "100px", height: "100px" }}
              />
              <p>{image.caption}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sell;
