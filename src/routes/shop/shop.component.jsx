import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "../category-preview/category-preview.component";
import Category from "../category/category.comoponent";
import "./shop.styles.scss";
const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />}></Route>
      <Route path=":category" element={<Category />}></Route>
    </Routes>
  );
};

export default Shop;
