import React from 'react';
import {useSelector} from "react-redux";
import "../App.css"
import more from "../assets/images/more.svg"
import {useNavigate} from "react-router-dom";

const Header = () => {
    const history = useNavigate()
    const windowWidth = useSelector((state:any)=> state.width.width)
    const basket = useSelector((state:any) => state.basket.basket)
    return (
        <div className="flex flex-col">
            <div className="w-full flex justify-between px-8 flex-nowrap bg-teal-400 items-center text-white">
                <p onClick={()=>history("/")} className="py-4 text-2xl hover:cursor-pointer hover:text-black hover:underline">logo</p>
                { windowWidth > 748 ? <nav className="flex justify-between items-center ">
                        <p className="px-2 hover:cursor-pointer transform hover:scale-[1.2] hover:text-teal-700">Главная</p>
                        <p onClick={()=>history("/")} className="px-2 hover:cursor-pointer transform hover:scale-[1.2] hover:text-teal-700">Магазин</p>
                        <p className="px-2 hover:cursor-pointer transform hover:scale-[1.2] hover:text-teal-700 mr-8">О нас</p>
                        <div onClick={()=>history("/basket")} className="flex items-center hover:cursor-pointer relative ">
                            <svg id="basket" width="32px" height="32px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M.75-.02a.75.75 0 100 1.5l.408-.006 1.606 1.281 1.839 6.881L4.237 12a2 2 0 102.188 2.722l5.705.028a2 2 0 100-1.5l-5.705-.028a2.007 2.007 0 00-.722-.898l.438-2.632 7.933.027 1.91-7.715H4.227L1.683-.026 1.68-.02v-.005L.75-.02z"
                                    fill="white"></path>
                            </svg>
                            <p className="text-2xl px-2">{basket.length}</p>
                            <p className="px-2">Корзина</p>
                        </div>
                    </nav>
                    :
                    <div>
                        <img onClick={()=>{
                            document.querySelector(".list").classList.toggle("hidden")
                        }
                        } className="pt-2 hover:cursor-pointer" src={more} alt=""/>
                    </div>
                }
            </div>
            {windowWidth > 748 ?
                null
                :
                <ul className="flex flex-col justify-center items-center w-full bg-teal-300 hidden list text-white">
                    <p onClick={()=>history("/basket")} className="py-2 hover:cursor-pointer transform hover:scale-[1.2] hover:text-teal-700">Корзина</p>
                    <p className="py-2 hover:cursor-pointer transform hover:scale-[1.2] hover:text-teal-700">Главная</p>
                    <p onClick={()=>history("/")} className="py-2 hover:cursor-pointer transform hover:scale-[1.2] hover:text-teal-700">Магазин</p>
                    <p className="py-2 hover:cursor-pointer transform hover:scale-[1.2] hover:text-teal-700">О нас</p>
                </ul>
            }
        </div>
    );
};

export default Header;