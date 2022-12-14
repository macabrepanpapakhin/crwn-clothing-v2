import CategoryItem from "../category-item/category-item.component";

const Directory = ({ categories }) => {
  return (
    <div className="categories-container">
      {categories.map(({ title, imageUrl, id }) => (
        <CategoryItem title={title} imageUrl={imageUrl} key={id} />
      ))}
    </div>
  );
};
export default Directory;
