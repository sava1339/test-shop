import {SET_WINDOW_WIDTH} from "./commands";
const stateRoot ={
    width:0
}

export const widthReducer = (state=stateRoot,action:any)=>{
    switch (action.type) {
        case SET_WINDOW_WIDTH:
            return ({...state,width: action.data.width})
        default:
            return state
    }
}