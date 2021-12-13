import * as React from "react";
import { Link } from "react-router-dom";
import { User } from "../utils/apiService";
import { IProduct } from "../utils/types";

const Products: React.FC = () => {
  const [products, setProducts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [filteredCategoryID, setFilteredCategoryID] = React.useState<number>(
    null
  );

  React.useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
    fetchCategories();
  }, []);

  const handleFilter = (e: any) => {
    e.preventDefault();
    fetch(`/api/products/filter_category/${filteredCategoryID}`)
      .then((res) => res.json())
      .then((res) => setProducts(res))
      .catch((err) => console.log(err));
  };

  const fetchProducts = () => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.log(err));
  };

  const fetchCategories = () => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  };

  const displayAddProduct = () => {
    if (User.role === "admin") {
      return (
        <Link className="btn btn-outline-warning nav-link" to="/products/add">
          Add Product
        </Link>
      );
    }
  };

  return (
    <main className="container">
      <div className="d-flex justify-content-between">
        <h1>Products</h1>
        {displayAddProduct()}
      </div>
      <div className="row">
        <h3>Count: {products.length}</h3>
        <form className="form" onSubmit={handleFilter}>
          <div className="form-group">
            <select
              className="form-control"
              name="categorySelect"
              id="categorySelect"
              onChange={(e) => setFilteredCategoryID(parseInt(e.target.value))}
            >
              <option value="0">All</option>
              {categories.map((category: any) => {
                return (
                  <option value={category.CategoryID} key={category.CategoryID}>
                    {category.Name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <input className="btn btn-primary" type="submit" value="Filter" />
          </div>
        </form>
      </div>
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4">
        {/* {products.map((p: IProduct) => {
          return (
            <div key={p.ProductID} className="card">
              <Link to={`/products/${p.ProductID}`}>{p.Name}</Link>
              <img src={p.imageURL} alt={p.Name} />
            </div>
          );
        })} */}
      </div>
    </main>
  );
};

export default Products;
