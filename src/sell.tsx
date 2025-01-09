import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebaseConfig"; // Firebaseの初期設定ファイル
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig"; // Firebase Authの設定

const Sell: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [user] = useAuthState(auth); // 現在のログイン状態を取得

  useEffect(() => {
    const fetchImage = async () => {
      if (user) {
        try {
          // Firebase Storage 内の画像のパスを指定
          const imageRef = ref(storage, `users/${user.uid}/supply-list`);
          const url = await getDownloadURL(imageRef);
          setImageUrl(url);
        } catch (error) {
          console.error("画像の取得に失敗しました: ", error);
          setImageUrl(null);
        }
      }
      setLoading(false);
    };

    fetchImage();
  }, [user]);

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
