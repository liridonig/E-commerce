import "./category-item.styles.css";

const CategoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <div className="col-md-4">
      <div
        className="products-box"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <h2>{title}</h2>
        <p>Shop now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
