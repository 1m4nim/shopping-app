import { useNavigate } from "react-router-dom";

export const NewpageButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/supply-list");
  };

  return (
    <button style={{ width: "700px" }} onClick={handleClick}>
      さあ！お買い物をしよう！
    </button>
  );
};
