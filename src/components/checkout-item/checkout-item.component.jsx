import "./checkout-item.styles.scss";
import { ReactComponent as RemoveIcon } from "../../assets/close-outline.svg";
import { ReactComponent as IncreaseIcon } from "../../assets/chevron-forward-outline.svg";
import { ReactComponent as DecreaseIcon } from "../../assets/chevron-back-outline.svg";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
const CheckOutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity, id } = cartItem;
  const { reduceItems, addItems, removeItem } = useContext(CartContext);
  return (
    <div className="checkout-item-container" key={id}>
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>

      <p className="name">{name}</p>
      <div className="quantity">
        <DecreaseIcon
          style={{ width: 25 }}
          className="arrow"
          onClick={() => reduceItems(cartItem, 1)}
        />
        <span>{quantity}</span>
        <IncreaseIcon
          style={{ width: 25 }}
          className="arrow"
          onClick={() => addItems(cartItem, 1)}
        />
      </div>
      <span className="price">
        {price}({price * quantity})
      </span>
      <button className="remove-button" onClick={() => removeItem(cartItem)}>
        <RemoveIcon style={{ width: 25 }} />
      </button>
    </div>
  );
};
export default CheckOutItem;
