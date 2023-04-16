export interface products{
    type:string,
    id:number,
    sku:string,
    title:string,
    regular_price:{
        currency:string,
        value:number,
    },
    image:string,
    brand:number,
}
export interface brands{
    id:number,
    title:string,
    sort:string,
    code:string
}
export interface basketItem{
    id:number,
    count:number,
    price:number
}