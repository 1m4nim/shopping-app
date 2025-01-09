import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig"; // Firebase Authentication の設定

const UploadImage: React.FC = () => {
  const [user] = useAuthState(auth); // ログイン状態を取得

  const handleUpload = async (file: File) => {
    if (user) {
      try {
        // ユーザーごとのパスを指定
        const storage = getStorage();
        const storageRef = ref(storage, `users/shopping-app-75095/supply-list`);

        // Firebase Storage に画像をアップロード
        await uploadBytes(storageRef, file);
        console.log("画像のアップロードが成功しました");
      } catch (error) {
        console.error("画像のアップロードに失敗しました:", error);
      }
    } else {
      console.log("ログインしていないため、アップロードできません");
    }
  };

  return (
    <input
      type="file"
      onChange={(e) => {
        if (e.target.files && e.target.files[0]) {
          handleUpload(e.target.files[0]);
        }
      }}
    />
  );
};

export default UploadImage;
