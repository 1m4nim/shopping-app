import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

// Storageインスタンスを取得
const storage = getStorage();

// Firebase Storageの画像リストを取得する関数
export const getImagesFromStorage = async (folderPath: string) => {
  const folderRef = ref(storage, folderPath); // 画像フォルダへの参照
  const fileList = await listAll(folderRef); // フォルダ内のファイルリストを取得

  // 各ファイルのダウンロードURLを取得
  const urls = await Promise.all(
    fileList.items.map((item) => getDownloadURL(item))
  );

  return urls; // URLのリストを返す
};
