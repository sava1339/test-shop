import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {basketItem, products} from "../models/models";
import BasketItem from "../components/basketItem";
import {CLEAR_BASKET} from "../store/commands";
import "../App.css"
import {useInput} from "../hooks/useInput";
import axios from "axios";

const Basket = () => {
    const basket = useSelector((state:any)=>state.basket.basket)
    const fullPrice = useSelector((state:any)=>state.basket.fullPrice)
    const dispatch = useDispatch()
    const [modalWindow,setModalWindow] = useState(false)
    const name = useInput()
    const tel = useInput()
    const clearBasket = ()=>{
        dispatch({type:CLEAR_BASKET,data:{id:-1}})
    }
    const buyProducts = ()=>{
        axios.post("https://app.aaccent.su/js/confirm.php").then(data=>{
            setModalWindow(false)
            clearBasket()
        })
    }
    return (
        <div className="mt-8 flex basket">
            <div className="left-basket">
                {basket.map((el:basketItem)=>
                        <div key={el.id}>
                            <BasketItem el={el} />
                        </div>
                    )}
            </div>
            <div className="right-basket">
                <div className="w-4/5 px-4 py-8 shadow-xl">
                    <p className="text-center">Цена: {fullPrice.toFixed(2)} $</p>
                    <p className="text-center">Оформление заказа</p>
                    <form className="flex flex-col w-2/3 mx-auto" >
                        <input value={name.value} onChange={name.change} className="bg-teal-100 my-2 px-1 rounded" placeholder="Имя" type="text"/>
                        <input value={tel.value} onChange={tel.change} className="bg-teal-100 my-2 px-1 rounded" placeholder="Телефон" type="text"/>
                        {basket.length > 0 ?
                            <button onClick={()=>setModalWindow(true)} type="reset" className="text-2xl w-full rounded-3xl mt-12 font-bold text-white py-6 bg-teal-500">Заказать</button>
                            :
                            <button type="button" className="text-2xl w-full hover:cursor-default rounded-3xl mt-12 font-bold text-white py-6 bg-gray-400">Заказать</button>
                        }
                    </form>
                </div>
            </div>
            {modalWindow && <div
                className="fixed bg-[black] w-[100vw] h-[100vh] opacity-[80%] flex justify-center items-center top-0 left-0">
                <div
                    className=" text-2xl bg-white w-2/3 rounded text-black flex justify-center items-center flex-col py-8">
                    <p>Вы успешно купили товары!</p>
                    <p className="my-4">Общая сумма: {fullPrice.toFixed(2)} $</p>
                    <div className="flex w-1/3 justify-around">
                        <button onClick={buyProducts} className="px-6 py-2 text-white rounded-[10px] bg-green-500">Закрыть</button>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default Basket;