import {FETCH_PRODUCTS, FILTER_PRODUCTS} from "./commands";
import {products} from "../models/models";
import product from "../components/product";
const stateRoot = {
    products:[],
}
let products = <products[]>[]
export const productsReducer = (state=stateRoot,action:any)=>{
    switch (action.type){
        case FETCH_PRODUCTS:
            products = []
            for(let i = (action.data.page-1) * action.data.elForPage;i<(((action.data.page-1) * action.data.elForPage)+action.data.elForPage);i++){
                if(action.data.arr[i]!= undefined){
                    products.push(action.data.arr[i])
                }else{
                    break
                }
            }
            return ({...state,products:products})
        case FILTER_PRODUCTS:
            const filteredProducts = <products[]>[]
            products = []
            if(action.data.filter.length != 0){
                action.data.arr.map(async(el:products)=>{
                    action.data.filter.map((fil:number)=>{
                        if(el.brand === fil){
                            filteredProducts.push(el)
                        }
                    })
                })
                for(let i = (action.data.page-1) * action.data.elForPage;i<((action.data.page-1) * action.data.elForPage)+action.data.elForPage;i++){
                    if(filteredProducts[i]){
                        products.push(filteredProducts[i])
                    }else{
                        break
                    }
                }
                return ({...state,products:products})
            }else {
                for(let i = (action.data.page-1) * action.data.elForPage;i<((action.data.page-1) * action.data.elForPage)+action.data.elForPage;i++){
                    if(action.data.arr[i]!= undefined){
                        products.push(action.data.arr[i])
                    }else{
                        break
                    }
                }
                return ({...state,products:products})
            }
        default:
            return state
    }
}