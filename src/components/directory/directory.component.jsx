import DirectoryItem from "../directory-item/directory-item.component";

const Directory = ({ categories }) => {
  return (
    <div className="categories-container">
      {categories.map(({ title, imageUrl, id }) => (
        <DirectoryItem title={title} imageUrl={imageUrl} key={id} />
      ))}
    </div>
  );
};
export default Directory;
