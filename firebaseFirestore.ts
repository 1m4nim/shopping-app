import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore();

export const saveSelectedImageToFirestore = async (
  imageUrl: string,
  caption: string
) => {
  try {
    const docRef = doc(db, "imageCaptions", new Date().toISOString());
    await setDoc(docRef, { imageUrl, caption });
    console.log("Firestoreに保存されました:", { imageUrl, caption });
  } catch (error) {
    console.error("Firestoreへの保存に失敗しました:", error);
    throw error;
  }
};
