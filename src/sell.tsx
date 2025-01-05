import { useState, useEffect } from "react";
import { storage, auth } from "../firebase"; // Firebase Auth をインポート
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";

// 画像とキャプションを格納するためのインターフェース
interface ImageWithCaption {
  url: string;
  caption: string;
}

const Sell = () => {
  const [images, setImages] = useState<ImageWithCaption[]>([]); // 画像とキャプションのリスト
  const [user, setUser] = useState<null | { email: string }>(null); // ログインユーザー情報
  const [loading, setLoading] = useState(true); // ロード状態

  // Firebase Authentication を使用してログイン状態を監視
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({ email: currentUser.email || "匿名ユーザー" });
      } else {
        setUser(null);
      }
      setLoading(false); // ロードが終了
    });

    return () => unsubscribe(); // クリーンアップ
  }, []);

  // Firebase Storage から指定フォルダ内の画像を取得
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesRef = ref(
          storage,
          "gs://shopping-app-75095.firebasestorage.app/supply-list/"
        );

        // フォルダ内のアイテムを取得
        const result = await listAll(imagesRef);

        // 各画像のダウンロードURLを取得
        const imageList = await Promise.all(
          result.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return { url, caption: "" }; // キャプションは初期状態では空
          })
        );

        setImages(imageList); // 取得した画像リストを状態にセット
      } catch (error) {
        console.error("画像の取得エラー:", error);
      }
    };

    fetchImages();
  }, []);

  // キャプションを更新
  const handleCaptionChange = (index: number, newCaption: string) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index].caption = newCaption;
      return updatedImages;
    });
  };

  // キャプションを保存（実際にはここでバックエンドに保存する処理を追加可能）
  const handleSaveCaption = (index: number) => {
    alert(
      `画像 ${index + 1} のキャプションが保存されました: ${
        images[index].caption
      }`
    );
  };

  if (loading) {
    return <p>読み込み中...</p>;
  }

  if (!user) {
    return <p>このページを見るにはログインが必要です。</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontWeight: "1.5rem", color: "black" }}>
        ようこそ、{user.email} さん
      </h2>
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
