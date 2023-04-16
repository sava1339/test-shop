import {
    ADD_PRODUCT_IN_BASKET,
    REMOVE_PRODUCT_IN_BASKET,
    ADD_COUNT_PRODUCT,
    REMOVE_COUNT_PRODUCT,
    CLEAR_BASKET
} from "./commands";
import {basketItem} from "../models/models";

const stateRoot = {
    basket:[],
    fullPrice:0
}
export const basketReducer = (state=stateRoot,action:any) =>{
    const indexProduct = state.basket.findIndex(({id})=>id === action.data.id)
    const item:basketItem = state.basket[indexProduct]
    let newProduct;
    switch (action.type){
        case ADD_PRODUCT_IN_BASKET:
            for(let i =0;i<state.basket.length;i++){
                if(state.basket[i].id === action.data.id){
                    return state;
                }
            }
            return ({...state,basket:[...state.basket,{
                    id:action.data.id,
                    count:0,
                    price:action.data.price
                }
            ]})
        case ADD_COUNT_PRODUCT:
            newProduct = {
                id:item.id,
                count:item.count+1,
                price:item.price
            }
            return {
                ...state,
                basket: [
                        ...state.basket.slice(0,indexProduct),
                        newProduct,
                        ...state.basket.slice(indexProduct + 1)
                    ],
                fullPrice: state.fullPrice + item.price
                }
        case REMOVE_COUNT_PRODUCT:
            if(item.count > 0){
                newProduct = {
                    id:item.id,
                    count:item.count-1,
                    price:item.price
                }
                return {
                    ...state,
                    basket: [
                        ...state.basket.slice(0,indexProduct),
                        newProduct,
                        ...state.basket.slice(indexProduct + 1)
                    ],
                    fullPrice: state.fullPrice - item.price
                }
            }
            return state
        case REMOVE_PRODUCT_IN_BASKET:
            return ({...state,basket: state.basket.filter((el:basketItem)=>el.id!=action.data.id),fullPrice:state.fullPrice-(item.price*item.count)})
        case CLEAR_BASKET:
            return ({...state,basket: [],fullPrice: 0})
        default:
            return state
    }
}