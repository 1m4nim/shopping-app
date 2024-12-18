import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "./firebaseConfig"; // Firebaseの設定をインポート

const db = getFirestore(app);

export const saveSelectedImageToFirestore = async (
  imageUrl: string,
  caption: string
) => {
  try {
    const docRef = await addDoc(collection(db, "images"), {
      imageUrl,
      caption,
      createdAt: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
