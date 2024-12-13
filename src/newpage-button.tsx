import { useNavigate } from "react-router-dom";
import "./newpage-button.css";

export const NewpageButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/item-page");
  };

  return (
    <button className="newpage-button" onClick={handleClick}>
      さあ！
      <br />
      お買い物をしよう！
    </button>
  );
};
