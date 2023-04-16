import {combineReducers, createStore} from "redux";
import {basketReducer} from "./basketReducer";
import {productsReducer} from "./productsReducer";
import {widthReducer} from "./widthReducer";

const rootReducer = combineReducers({
    basket:basketReducer,
    products:productsReducer,
    width:widthReducer
})
export const store = createStore(rootReducer)