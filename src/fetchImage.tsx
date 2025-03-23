import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const storage = getStorage();
const db = getFirestore();

const fetchImage = async (userUid: string) => {
  try {
    // Firestoreから保存された画像パスを取得
    const userDoc = doc(db, "users", userUid);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      const imagePath = docSnap.data().imagePath; // Firestoreに保存された画像パスを取得
      const imageRef = ref(storage, imagePath);

      // 画像のダウンロードURLを取得
      const imageUrl = await getDownloadURL(imageRef);
      console.log("画像URL: ", imageUrl);
      return imageUrl;
    } else {
      console.error("指定されたユーザーに画像データがありません");
      return null;
    }
  } catch (error) {
    console.error("画像の取得に失敗しました: ", error);
    throw error;
  }
};
