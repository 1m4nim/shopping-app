import { getFirestore, doc, setDoc } from "firebase/firestore";

// Firestoreインスタンスを取得
const db = getFirestore();

// Firestoreに画像URLとキャプションを保存する関数
export const saveSelectedImageToFirestore = async (
  imageUrl: string,
  caption: string
) => {
  try {
    // 一意なドキュメントIDを生成
    const docRef = doc(db, "imageCaptions", new Date().toISOString());
    // データをFirestoreに保存
    await setDoc(docRef, { imageUrl, caption });
    console.log("Firestoreに保存されました:", { imageUrl, caption });
  } catch (error) {
    console.error("Firestoreへの保存に失敗しました:", error);
    throw error;
  }
};
