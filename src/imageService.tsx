import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { app } from "../firebaseConfig"; // Firebaseアプリをインポート

// Firebase Storage のインスタンスを作成
const storage = getStorage(app);

/**
 * Firebase Storage から指定したフォルダの画像URLを取得する関数
 * @param folderName フォルダ名 (例: "images/")
 * @returns 画像URLの配列
 */
export const getImagesFromStorage = async (
  folderName: string
): Promise<string[]> => {
  try {
    // 指定フォルダの参照を取得
    const listRef = ref(storage, folderName);

    // フォルダ内の全てのアイテムをリストアップ
    const result = await listAll(listRef);

    // 各アイテムのダウンロードURLを取得
    const urls = await Promise.all(
      result.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return url;
      })
    );

    return urls; // URLの配列を返す
  } catch (error) {
    console.error("Error fetching images from storage:", error);
    throw error; // エラーをスローして呼び出し元で処理
  }
};
