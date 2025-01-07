import { useState, useEffect } from "react";
import { auth, storage } from "../firebase"; // Firebase Auth と Storage をインポート
import { ref, listAll, getDownloadURL } from "firebase/storage"; // Firebase Storage のメソッドをインポート
import { onAuthStateChanged } from "firebase/auth";

// ログイン状態でのみ画像を表示するコンポーネント
const Sell = () => {
  const [images, setImages] = useState<string[]>([]); // 画像URLのリスト
  const [user, setUser] = useState<null | { name: string; email: string }>(
    null
  ); // ログインユーザー情報
  const [loading, setLoading] = useState(true); // ロード状態

  // Firebase Storage から画像URLを取得する関数
  const fetchImages = async (folderPath: string) => {
    try {
      const folderRef = ref(storage, folderPath); // フォルダの参照を取得
      const result = await listAll(folderRef); // フォルダ内のアイテムを一覧取得
      const urls = await Promise.all(
        result.items.map((itemRef) => getDownloadURL(itemRef)) // 各アイテムのダウンロードURLを取得
      );
      return urls;
    } catch (error) {
      console.error("画像の取得エラー:", error);
      return [];
    }
  };

  // Firebase Authentication を使用してログイン状態を監視
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || "匿名ユーザー",
          email: currentUser.email || "不明なメールアドレス",
        });

        // ログイン状態の場合にのみ画像を取得
        try {
          const fetchedImages = await fetchImages("supply-list/");
          setImages(fetchedImages); // 画像リストをセット
        } catch (error) {
          console.error("画像の取得エラー:", error);
        }
      } else {
        setUser(null);
        setImages([]); // ログアウト時は画像リストをクリア
      }
      setLoading(false); // ロードが終了
    });

    return () => unsubscribe(); // クリーンアップ
  }, []);

  if (loading) {
    return <p style={{ fontSize: "1.5rem", color: "black" }}>読み込み中...</p>;
  }

  if (!user) {
    return (
      <p style={{ fontSize: "1.5rem", color: "black" }}>
        このページを見るにはログインが必要です。
      </p>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontWeight: "1.5rem", color: "black" }}>
        ようこそ、{user.name} さん
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {images.length === 0 ? (
          <p
            style={{
              color: "saddlebrown",
              fontSize: "1.5rem",
              backgroundColor: "goldenrod",
            }}
          >
            画像がありません。
          </p>
        ) : (
          images.map((url, index) => (
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
                src={url}
                alt={`Storage Image ${index}`}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sell;
