import React from 'react';
import {products} from "../models/models";
import {useDispatch, useSelector} from "react-redux";
import {ADD_PRODUCT_IN_BASKET} from "../store/commands";
interface propsInt{
    product:products
}

const Product = ({product}:propsInt) => {
    const basket = useSelector((state:any)=>state.basket.basket)
    const dispatch = useDispatch()
    const addProduct = (id:number,price:number)=>{
        dispatch({type:ADD_PRODUCT_IN_BASKET,data:{id:id,price:price}})
        alert("Товар добавлен в корзину!")
    }
    return (
        <div className=" bg-gray-300 px-4 py-2 rounded mt-4 mx-1">
            <img src={`http://localhost:5173/src/assets${product.image}`} className="w-64" alt=""/>
            <p>Название: {product.title}</p>
            <div className="flex justify-between flex-nowrap items-center" >
                <p>Цена: {product.regular_price.value}</p>
                <button onClick={()=>addProduct(product.id,product.regular_price.value)} className="bg-teal-500 ml-2 px-2 py-1 rounded hover:text-white" >В корзину</button>
            </div>
        </div>
    );
};

export default Product;