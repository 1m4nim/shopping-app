import { useEffect, useState } from "react";

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "gs://shopping-app-75095.firebasestorage.app/supply-list",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer <your-firebase-token>`, // Firebase Token が必要な場合
            },
          }
        );

        if (!response.ok) {
          throw new Error(`エラー: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result); // データを保存
        console.log("データ:", result);
      } catch (error) {
        console.error("エラー:", error);
      }
    };

    fetchData();
  }, []); // 空の配列にすることで、マウント時に一度だけ実行されます。

  return (
    <div>
      <h1>Firebase Storage のデータ</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>データを取得中...</p>
      )}
    </div>
  );
};

export default MyComponent;
