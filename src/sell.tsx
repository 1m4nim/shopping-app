import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { auth } from "../firebaseConfig"; // Firebase Auth設定
import { getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";

// Firebaseの初期化
const firebaseApp = getApp();
const storage = getStorage(firebaseApp);

const Sell: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [user] = useAuthState(auth); // 現在ログイン中のユーザー情報を取得

  useEffect(() => {
    const fetchImage = async () => {
      if (user) {
        try {
          // ログイン中のユーザーのUIDを取得
          const userUid = user.uid;

          // ユーザーのUIDを動的に使用して画像パスを設定
          const imageRef = ref(storage, `users/${userUid}/supply-list`);
          const url = await getDownloadURL(imageRef);

          // 画像のURLを状態に保存
          setImageUrl(url);
        } catch (error) {
          console.error("画像の取得に失敗しました: ", error);
          setImageUrl(null);
        }
      }
      setLoading(false);
    };

    fetchImage();
  }, [user]); // userが変わるたびに実行

  // ユーザーが未ログインの場合
  if (!user) {
    return (
      <p style={{ fontSize: "1.5rem", color: "black" }}>
        画像を表示するにはログインしてください。
      </p>
    );
  }

  return (
    <div>
      {loading ? (
        <p style={{ color: "black", fontSize: "1.5rem" }}>
          画像を読み込んでいます...
        </p>
      ) : imageUrl ? (
        <img
          src={imageUrl}
          alt="Uploaded File"
          style={{
            maxWidth: "100%",
            height: "auto",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />
      ) : (
        <p style={{ color: "red", fontSize: "1.5rem" }}>
          画像が見つかりませんでした。
        </p>
      )}
    </div>
  );
};

export default Sell;
