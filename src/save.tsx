import { db } from "../firebase"; // Firestore 初期化
import { doc, setDoc } from "firebase/firestore";

// キャプションを保存する関数
export const saveCaptionToFirestore = async (
  index: number,
  url: string,
  caption: string
): Promise<void> => {
  try {
    // ドキュメント ID を生成 (例: "image_0", "image_1")
    const docId = `image_${index}`;
    const docRef = doc(db, "imageCaptions", docId);

    // Firestore にデータを保存
    await setDoc(docRef, {
      url, // 画像のダウンロード URL
      caption, // キャプション
    });

    alert(`画像 ${index + 1} のキャプションが保存されました: ${caption}`);
  } catch (error) {
    console.error("キャプションの保存エラー:", error);
    alert("キャプションの保存中にエラーが発生しました。");
  }
};
