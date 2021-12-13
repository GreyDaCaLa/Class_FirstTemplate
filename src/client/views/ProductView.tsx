import * as React from "react";
import { useHistory, useParams } from "react-router";
import { apiService, User } from "../utils/apiService";
import { IProduct } from "../utils/types";
import EditModal from "../components/EditModal";

const ProductView: React.FC = () => {
  const [feedback, setFeedback] = React.useState<string>("");
  const [product, setProduct] = React.useState<IProduct>(null);
  const [displayModal, setDisplayModal] = React.useState<boolean>(false);

  const params: any = useParams();
  const history: any = useHistory();

  React.useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    let [res] = await apiService(`/api/products/${params.id}`);
    console.log(res);
    if (res) {
      setProduct(res);
    } else {
      console.log("Could not fetch product details");
    }
  };

  const handleDisplayModal = () => {
    setDisplayModal(!displayModal);
  };

  const handleProductRemoval = async () => {
    let res = await apiService(`/api/products/${product.ProductID}`, "DELETE");
    if (res) {
      setFeedback(
        "Successfully removed product. You are about to be redirected.."
      );
      setTimeout(() => history.push("/products"), 3000);
    } else {
      setFeedback("An occurred while removing the product. IT STAYS.");
    }
  };

  const displayAdminOptions = () => {
    if (User.role === "admin") {
      return (
        <React.Fragment>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-edit-2"
            onClick={handleDisplayModal}
          >
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-trash-2"
            onClick={handleProductRemoval}
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </React.Fragment>
      );
    }
  };

  if (displayModal) {
    return (
      <EditModal
        productID={product.ProductID}
        name={product.Name}
        categoryID={product.CategoryID}
        stockLevel={product.StockLevel}
        price={product.Price}
        onSale={product.OnSale}
        handleDisplayModal={handleDisplayModal}
        setProduct={setProduct}
      />
    );
  } else {
    return (
      <main className="container">
        <p className="text-center">{feedback}</p>
        <div className="card text-center">
          <div className="card-header row p-2">
            <div className="col-md-8">
              <h6 className="text-left">Options</h6>
            </div>
            <div className="col-md-4 d-flex justify-content-around">
              {displayAdminOptions()}
            </div>
          </div>
          <div className="card-body">
            <h1>{product?.Name}</h1>
            <p>{product?.Price}</p>
            <p>{product?.OnSale ? "On Sale" : "Not On Sale"}</p>
            <p>{product?.StockLevel}</p>
          </div>
        </div>
      </main>
    );
  }
};

export default ProductView;
