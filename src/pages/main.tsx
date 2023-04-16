import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ADD_PRODUCT_IN_BASKET, FETCH_PRODUCTS, FILTER_PRODUCTS, REMOVE_PRODUCT_IN_BASKET} from "../store/commands";
import {brands, products} from "../models/models";
import Product from "../components/product";
import "../style/style.css";
import cancel from "../assets/images/cancel.svg";
import {brandsData, productsData} from "../serverData/data";

const Main = () => {
    const elementsForPage = 6
    const [page,setPage] = useState(1)
    const [allPages,setAllPages] = useState<number[]>([])
    const products = useSelector((state:any) => state.products.products)
    const basket = useSelector((state:any)=>state.basket.basket)
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(true)
    const [filters,setFilters] = useState<number[]>([])
    const [selectFilter,setSelectFilter] = useState<number[]>([])
    const filterController = async (id:number) =>{
        if(selectFilter.includes(id)){
            setSelectFilter(selectFilter.filter(el=>el != id))
        }else{
            setSelectFilter(filter=>[...filter,id])
        }
    }
    const filterReset = ()=>{
        setSelectFilter([])
        setFilters([])
    }
    const confirm = ()=>{
        setFilters(selectFilter)
        dispatch({type:FILTER_PRODUCTS,data:{arr:productsData,filter:selectFilter,page:page,elForPage:elementsForPage}})
    }
    const getPage = ()=>{
        setAllPages([])
        let productLength = 0
        if(filters.length != 0){
            productsData.map((el:products)=>{
                filters.map(fil=>{
                    el.brand === fil ? productLength++ : null
                })
            })
        }else{
            productLength = productsData.length
        }
        for(let i = 1;i<Math.ceil(productLength/elementsForPage)+1;i++){
            setAllPages(allPages=>[...allPages,i])
        }
    }
    useEffect(()=>{
        setLoading(true)
        dispatch({type:FETCH_PRODUCTS,data:{arr:productsData,page:page,elForPage:elementsForPage}})
        getPage()
        setLoading(false)
    },[])
    useEffect(()=>{
        setLoading(true)
        dispatch({type:FILTER_PRODUCTS,data:{arr:productsData,filter:filters,page:page,elForPage:elementsForPage}})
        getPage()
        setLoading(false)
    },[filters,page])
    return (
        <div>
            {loading ?
                <div className="text-center mt-32">
                    <div role="status">
                        <svg aria-hidden="true"
                             className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"/>
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                :
                <div style={{width: "80%"}} className="shop flex flex-wrap mx-auto mt-32">
                    <div className="filter">
                        <p className="text-teal-700 text-2xl font-bold">Бренды</p>
                        <ul className="pt-4">
                            <form>
                                {brandsData.map((el:brands)=>
                                    <li key={el.id} className="flex items-center"><input type="checkbox" onClick={()=>filterController(el.id)}  className="w-8 h-8  my-1 accent-teal-400 mr-4 hover:cursor-pointer"/><p className="text-2xl">{el.title}</p></li>
                                )}
                                <button type="button" onClick={()=> {
                                    confirm();
                                    setPage(1)
                                }} className="text-2xl w-full rounded-3xl mt-12 font-bold text-white py-6 bg-teal-500">Применить</button>
                                <button className="w-full" type="reset" onClick={filterReset}>
                                    <p className="text-teal-400 my-8 text-2xl hover:cursor-pointer flex flex-wrap items-center justify-center"><img src={cancel} className="w-7 pt-1" alt=""/> <span className=" border-b-2 border-teal-400 ">Сбросить</span> </p>
                                </button>
                            </form>
                        </ul>
                    </div>
                    <div className="products mx-auto">
                        <div className="w-full flex flex-wrap justify-center">
                            {allPages.map(el=><p onClick={()=>setPage(el)} className="bg-teal-300 px-4 py-2 last:rounded-r-2xl first:rounded-l-2xl hover:cursor-pointer hover:bg-teal-400" key={el}>{el}</p>)}
                        </div>
                        <div className=" flex justify-around flex-wrap">
                            {products.map((el:products)=>
                                <div key={el.id}>
                                    <Product product={el}/>
                                </div>
                            )
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Main;