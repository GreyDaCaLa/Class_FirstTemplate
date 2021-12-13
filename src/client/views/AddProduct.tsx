import * as React from "react";

const AddProduct = () => {
  const [feedback, setFeedback] = React.useState<string>("");
  const [Name, setName] = React.useState<string>("");
  const [CategoryID, setCategoryID] = React.useState<number>(1);
  const [Price, setPrice] = React.useState<number>(0);
  const [OnSale, setOnSale] = React.useState<number>(0);
  const [StockLevel, setStockLevel] = React.useState<string>("");
  const [categories, setCategories] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((c) => setCategories(c))
      .catch((err) => console.log(err));
  };

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form: any = document.querySelector("input[type=file]");
    const fileList: any = form.files;
    const fileName: any = document.getElementById(
      "fileInput"
    ) as HTMLInputElement;

    const formData = new FormData();
    formData.append("image", fileList[0]);
    fetch("/api/images", {
      method: "POST",
      headers: {
        encoding: "binary",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          let body = {
            Name,
            Price,
            OnSale,
            StockLevel,
            CategoryID,
            imageURL: res
              ? `/assets/productImages/${fileName.value.slice(12)}`
              : null,
          };

          fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          })
            .then((res) => res.json())
            .then((res) => {
              if (res) {
                setFeedback("Successfully added product.");
              }
            })
            .catch((err) => {
              console.log(err);
              setFeedback(
                "An error occurred while inserting the product. Try again or contact support."
              );
            });
        }
      })
      .catch((err) => {
        console.log(err);
        setFeedback(
          "An error occurred while inserting the product image. Try again or contact support."
        );
      });
  };

  return (
    <main className="container">
      <h1 className="text-center">AddProduct</h1>
      <div className="row">
        <div className="card col-sm-6 mx-auto">
          <p className="text-center">{feedback}</p>
          <form className="form" onSubmit={formSubmit}>
            <div className="form-group">
              <label htmlFor="productName">Product Name:</label>
              <input
                className="form-control"
                type="text"
                name="productName"
                id="productName"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="productCategory">Product Category:</label>
              <select
                className="form-control"
                name="productCategory"
                id="productCategory"
                onChange={(e) => setCategoryID(Number(e.target.value))}
              >
                {categories.map((category) => {
                  return (
                    <option
                      value={category.CategoryID}
                      key={category.CategoryID}
                    >
                      {category.Name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="productPrice">Price:</label>
              <input
                className="form-control"
                type="number"
                step=".01"
                name="productPrice"
                id="productPrice"
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label htmlFor="onSale">On Sale:</label>
              <select
                className="form-control"
                onChange={(e) => setOnSale(Number(e.target.value))}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="stockLevel">Stock Level:</label>
              <input
                className="form-control"
                type="text"
                name="stockLevel"
                id="productStockLevel"
                onChange={(e) => setStockLevel(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Image:</label>
              <div className="custom-file">
                <input
                  type="file"
                  name="uploadFile"
                  className="custom-file-input"
                  id="fileInput"
                  accept="image/*"
                  onChange={(e) => {
                    document.getElementById(
                      "fileLabel"
                    ).innerHTML = e.target.value.slice(12);
                  }}
                />
                <label id="fileLabel" className="custom-file-label">
                  Choose file
                </label>
              </div>
            </div>
            <div className="form-group">
              <input className="form-control" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddProduct;
