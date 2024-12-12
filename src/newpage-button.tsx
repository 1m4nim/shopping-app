import { useNavigate } from "react-router-dom";

export const NewpageButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/item-page");
  };

  return (
    <button
      style={{
        width: "400px",
        fontSize: "24px",
        backgroundColor: "black",
        color: "white",
      }}
      onClick={handleClick}
    >
      さあ！
      <br />
      お買い物をしよう！
    </button>
  );
};
