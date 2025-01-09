import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { useEffect, useState } from "react";

const ViewImages: React.FC = () => {
  const [user] = useAuthState(auth);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      if (user) {
        try {
          const storage = getStorage();
          const folderRef = ref(storage, `users/${user.uid}/supply-list`);
          const result = await listAll(folderRef); // フォルダ内の全ファイルを取得
          const urls = await Promise.all(
            result.items.map((itemRef) => getDownloadURL(itemRef))
          );
          setImageUrls(urls);
        } catch (error) {
          console.error("画像の取得に失敗しました:", error);
        }
      }
      setLoading(false);
    };

    fetchImages();
  }, [user]);

  if (!user) {
    return <p>画像を表示するにはログインしてください。</p>;
  }

  return (
    <div>
      {loading ? (
        <p>画像を読み込んでいます...</p>
      ) : imageUrls.length > 0 ? (
        imageUrls.map((url, index) => (
          <img key={index} src={url} alt={`Uploaded File ${index + 1}`} />
        ))
      ) : (
        <p>画像が見つかりませんでした。</p>
      )}
    </div>
  );
};

export default ViewImages;
