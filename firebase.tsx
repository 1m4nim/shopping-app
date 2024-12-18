// import React, { useState } from "react";
// import { db, storage } from "./firebaseConfig";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { collection, addDoc } from "firebase/firestore";

// const UploadImage = () => {
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [caption, setCaption] = useState("");
//   const [error, setError] = useState("");

//   const handleImageUpload = async () => {
//     if (!imageFile) {
//       setError("画像が選択されていません");
//       return;
//     }

//     try {
//       const imageRef = ref(storage, `images/${imageFile.name}`);
//       await uploadBytes(imageRef, imageFile);

//       const downloadURL = await getDownloadURL(imageRef);
//       const newImage = {
//         caption,
//         imageUrl: downloadURL,
//       };

//       // Firestore に画像情報を保存
//       await addDoc(collection(db, "posts"), newImage);

//       setCaption(""); // フォームをリセット
//       setImageFile(null);
//     } catch (err) {
//       setError("画像のアップロードに失敗しました");
//     }
//   };

//   return (
//     <div>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => setImageFile(e.target.files?.[0] || null)}
//       />
//       <input
//         type="text"
//         placeholder="キャプションを入力"
//         value={caption}
//         onChange={(e) => setCaption(e.target.value)}
//       />
//       <button onClick={handleImageUpload}>アップロード</button>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// };

// export default UploadImage;
