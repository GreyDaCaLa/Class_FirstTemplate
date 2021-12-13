import Query from "../models"
import { IProduct } from "../../../client/utils/types";

const getOneProduct = async (id: number) =>{
    return Query("select * from products where ProductID =?",[id]);
};

const getAllProduct = async () => {
    return Query("select * from products");
};


const addProduct = async (body: IProduct)=>{
    return Query("insert into products set ?",[body]);
}

const updateProduct= async (body: IProduct,id: number)=>{
    return Query("update products set ? where ProductID = ?",[body,id]);
}

const removeProduct = async (id: number) => {
    return Query(`delete from products where productID = ?`, [id]);
}



export default {
    getAllProduct,
    getOneProduct,
    addProduct,
    updateProduct,
    removeProduct,
}