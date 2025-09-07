export interface ProductData{
    id:number;
    description:string;
    category:string;
    image:string;
    title:string;
    price:number;
}


export interface ProductSetting{
    description:string;
    category:string;
    image:string;
    title:string;
    price:number;
    isCompact:boolean;
}

export interface IProductAPI{
    getProduct:() => Promise<ProductData[]>
}