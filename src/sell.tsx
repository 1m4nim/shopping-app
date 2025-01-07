import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";

const Sell: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [user] = useAuthState(auth); // 現在のログイン状態を取得

  useEffect(() => {
    const fetchImage = async () => {
      if (user) {
        try {
          // Firebase Storage 内の画像のパス
          const imageRef = ref(storage, "supply-list");
          const url = await getDownloadURL(imageRef);
          setImageUrl(url);
        } catch (error) {
          console.error("画像の取得に失敗しました: ", error);
        }
      } else {
        setImageUrl(null);
      }
    };

    fetchImage();
  }, [user]);

  if (!user) {
    return <p>画像を表示するにはログインしてください。</p>;
  }

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="Uploaded File" />
      ) : (
        <p style={{ color: "black", fontSize: "1.5rem" }}>
          画像を読み込んでいます...
        </p>
      )}
    </div>
  );
};

export default Sell;
