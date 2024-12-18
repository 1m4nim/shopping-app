import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { app } from "./firebaseConfig"; // Firebaseの設定をインポート

const storage = getStorage(app);

export const getImagesFromStorage = async (
  folderName: string
): Promise<string[]> => {
  const listRef = ref(storage, folderName);
  const result = await listAll(listRef);
  const urls = await Promise.all(
    result.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      return url;
    })
  );
  return urls;
};
