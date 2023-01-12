import { useContext } from "react";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoriesContext } from "../../contexts/categories.context";
import "./shop.styles.scss";
const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  console.log(categoriesMap);
  return (
    <div className="products-container">
      {/* {categoriesMap?.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))} */}
    </div>
  );
};

export default Shop;
