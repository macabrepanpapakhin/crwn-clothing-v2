import { Link, useNavigate } from "react-router-dom";
import "./directory-item.style.scss";

const DirectoryItem = ({ title, imageUrl, route }) => {
  const navigate = useNavigate();
  const navigationHandler = () => navigate(route);
  return (
    <div className="directory-item-container" onClick={navigationHandler}>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

      <div className="directory-item-body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
