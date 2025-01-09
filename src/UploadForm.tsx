// import { useState } from "react";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { collection, addDoc } from "firebase/firestore";
// import { storage, firestore } from "./firebase"; // firebase.tsからインポート

// const UploadForm: React.FC = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [description, setDescription] = useState("");

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file) {
//       alert("ファイルを選択してください");
//       return;
//     }

//     try {
//       const storageRef = ref(storage, `images/${file.name}`);
//       await uploadBytes(storageRef, file);

//       const imageURL = await getDownloadURL(storageRef);

//       await addDoc(collection(firestore, "images"), {
//         name: file.name,
//         size: file.size,
//         type: file.type,
//         description: description,
//         url: imageURL,
//         uploadedAt: new Date(),
//       });

//       alert("画像と説明をアップロードしました！");
//       setFile(null);
//       setDescription("");
//     } catch (error) {
//       console.error("アップロードエラー:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="file" accept="image/*" onChange={handleFileChange} />
//       <input
//         type="text"
//         placeholder="画像の説明"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <button type="submit">アップロード</button>
//     </form>
//   );
// };

// export default UploadForm;
