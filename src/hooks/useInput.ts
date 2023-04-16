import {useState} from "react";

export const useInput = ()=>{
    const [value,setValue] = useState("")
    const changeHandler = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setValue(event.target.value)
    }
    return {
        value: value,
        change:changeHandler,
        setValue:setValue
    }
}