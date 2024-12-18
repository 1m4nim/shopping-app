import AuthComponent from "./AuthComponent";
import { User } from "firebase/auth"; // User 型をインポート
import "./login.css";

const Login = () => {
  // ユーザー変更時のコールバック関数 (User | null 型を指定)
  const handleUserChange = (user: User | null) => {
    console.log("ログイン状態が変更されました:", user);
  };

  return (
    <div>
      <h1>ログイン</h1>
      <AuthComponent onUserChange={handleUserChange} />
    </div>
  );
};

export default Login;
