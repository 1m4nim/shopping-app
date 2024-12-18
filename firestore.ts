import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { app } from "./firebaseConfig";

const db = getFirestore(app);

export const saveImageDataToFirestore = async (
  imageUrl: string,
  caption: string
) => {
  try {
    const docRef = await addDoc(collection(db, "supply-list"), {
      imageUrl,
      caption,
      timestamp: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    // エラー処理
    if (error instanceof Error) {
      throw new Error("Error saving image data to Firestore: " + error.message);
    } else {
      throw new Error(
        "Unknown error occurred while saving image data to Firestore"
      );
    }
  }
};

export const getImageDataFromFirestore = async () => {
  try {
    const q = query(
      collection(db, "supply-list"),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(q);
    const imageData: { imageUrl: string; caption: string; timestamp: any }[] =
      [];

    querySnapshot.forEach((doc) => {
      imageData.push(
        doc.data() as { imageUrl: string; caption: string; timestamp: any }
      );
    });

    return imageData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        "Error fetching image data from Firestore: " + error.message
      );
    } else {
      throw new Error(
        "Unknown error occurred while fetching image data from Firestore"
      );
    }
  }
};
