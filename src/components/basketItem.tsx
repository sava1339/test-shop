import React, {useEffect, useState} from 'react';
import {basketItem, products} from "../models/models";
import {useDispatch, useSelector} from "react-redux";
import {ADD_COUNT_PRODUCT, CLEAR_BASKET, REMOVE_COUNT_PRODUCT, REMOVE_PRODUCT_IN_BASKET} from "../store/commands";
import {productsData} from "../serverData/data";

interface props{
    el:basketItem,
}

const BasketItem:React.FC<props> = ({el}) => {
    const prod = productsData.find((prodData:products)=>prodData.id === el.id)
    const dispatch =useDispatch()
    const basket = useSelector((state:any)=>state.basket.basket)
    const addCount = ()=>{
        dispatch({type:ADD_COUNT_PRODUCT,data:{id:el.id}})
    }
    const remCount = ()=>{
        dispatch({type:REMOVE_COUNT_PRODUCT,data:{id:el.id}})
    }
    const remProd = ()=>{
        dispatch({type:REMOVE_PRODUCT_IN_BASKET,data:{id:el.id}})
    }
    return (
        <div className="flex bg-teal-100 rounded px-4 py-2 my-4 h-32 w-3/4 mx-auto">
            <img src={`http://localhost:5173/src/assets${prod.image}`} alt=""/>
            <div className=" flex flex-col">
                <p>Цена: {prod.regular_price.value}</p>
                <div className="flex flex-nowrap justify-between w-16 mt-4 items-center bg-gray-400 rounded-[15px]">
                    <button className="w-4 h-4 mx-1 flex justify-center items-center pb-1  bg-gray-500 rounded-[50%]" onClick={()=> {
                        remCount()
                    }} >-</button>
                    <p>{basket.find((item:basketItem)=>item.id === el.id).count}</p>
                    <button className="w-4 h-4 mx-1 flex justify-center items-center pb-1  bg-gray-500 rounded-[50%]" onClick={()=>addCount()} >+</button>
                </div>
            </div>
            <div className="w-full flex justify-end items-start">
                <svg onClick={remProd} viewBox="0 0 32 32" className="w-8 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000"><g id="cross"><line className="cls-1" x1="7" x2="25" y1="7" y2="25"/><line className="cls-1" x1="7" x2="25" y1="25" y2="7"/></g></svg>
            </div>
        </div>
    );
};

export default BasketItem;