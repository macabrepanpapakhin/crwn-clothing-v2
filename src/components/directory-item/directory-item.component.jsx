import { Link } from "react-router-dom";
import "./directory-item.style.scss";

const DirectoryItem = ({ title, imageUrl, route }) => {
  return (
    <div className="directory-item-container">
      <Link
        to={route}
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        {" "}
        <div />
      </Link>

      <div className="directory-item-body">
        <Link to={route}>
          <h2>{title}</h2>
          <p>Shop Now</p>
        </Link>
      </div>
    </div>
  );
};

export default DirectoryItem;
