import React, { useState, useEffect } from "react";
import { db, storage } from "../firebaseConfig"; // Firebase設定ファイルのインポート
import { ref, getDownloadURL } from "firebase/storage"; // Firebase StorageからURLを取得
import { collection, query, getDocs } from "firebase/firestore"; // Firestoreからデータを取得

interface ImageData {
  caption: string;
  imagePath: string; // Firestoreに保存されている画像のパス
  downloadURL: string; // Firebase Storageから取得した画像のURL
}

const Sell = () => {
  const [images, setImages] = useState<ImageData[]>([]); // 画像URLを格納するための状態
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log("画像データの取得を開始します...");
        // Firestoreのpostsコレクションから画像情報を取得
        const q = query(collection(db, "posts"));
        const querySnapshot = await getDocs(q); // キャッシュを無視して取得
        console.log(
          "取得した画像データ:",
          querySnapshot.docs.map((doc) => doc.data())
        );

        querySnapshot.docs.forEach((doc) => {
          console.log("Document data:", doc.data());
        });

        const imageData: ImageData[] = []; // 型を明示的に定義

        // Firestoreからデータを取得し、画像URLを取得
        for (const doc of querySnapshot.docs) {
          const data = doc.data();
          const imagePath = data.imagePath; // Firestoreから保存された画像のパスを取得

          console.log("取得したimagePath:", imagePath); // imagePathの確認

          // 画像のパスがStorageに格納されている場合
          if (imagePath) {
            try {
              console.log("Firebase Storageから画像URLを取得中...");
              // Firebase Storageから画像URLを取得 (画像のパスを指定)
              const imageRef = ref(storage, imagePath); // Firestoreに保存された画像のパスを使う
              const downloadURL = await getDownloadURL(imageRef);

              console.log("取得した画像URL:", downloadURL); // 画像URLの確認

              // 画像データとdownloadURLを統合
              const imageDataWithUrl: ImageData = {
                caption: data.caption || "", // 必要なフィールドを取得
                imagePath,
                downloadURL,
              };

              imageData.push(imageDataWithUrl); // 画像データを配列に追加
            } catch (err) {
              const error = err as Error; // エラー型を明示的に指定
              console.error("画像の取得に失敗:", error); // エラーログ
              setError(`画像の取得に失敗しました: ${error.message}`);
            }
          }
        }

        // 画像データを状態に設定
        console.log("取得した画像データ:", imageData); // 画像データの確認
        setImages(imageData);
      } catch (err) {
        const error = err as Error; // エラー型を明示的に指定
        console.error("画像データの取得に失敗:", error); // エラーログ
        setError(`画像データの取得に失敗しました: ${error.message}`);
      }
    };

    fetchImages();
  }, []); // 空の依存配列で一度だけ実行

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
