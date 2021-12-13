import Query from "../models";

const filterByCategory = (id: number) => {
  return Query(
    `SELECT p.ProductID, p.Name, p.Price, p.StockLevel, p.OnSale, p.imageURL, c.CategoryID, c.Name as CategoryName 
    from products as p 
    INNER JOIN categories as c 
    ON p.CategoryID = c.CategoryID 
    WHERE p.CategoryID = ?`,
    [id]
  );
};

export default filterByCategory;
