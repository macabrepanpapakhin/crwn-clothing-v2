import { useContext } from "react";
import { Fragment } from "react/cjs/react.production.min";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoriesContext } from "../../contexts/categories.context";
import "./shop.styles.scss";
const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        return (
          <Fragment key={title}>
            <h2>{title}</h2>
            <div className="products-container">
              {categoriesMap[title].map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default Shop;
