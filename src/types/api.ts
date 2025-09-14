import { ApiPostMethods } from "../components/base/api";
export interface ApiItem {
    id: string;
    title: string;
    description: string;
    price: number | null;
    image: string;
    category: string;
}
export interface ApiOrderApplication {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[]; 
}
export interface ApiOrderReaction {
    id: string;
    total: number;
}
export interface ApiError {
    error: string;
    message?: string;
}
export interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}
export interface IproductApi {
    getProductList(): Promise<ApiItem[]>;
    getProduct(id: string): Promise<ApiItem>;
    orderProducts(order: ApiOrderApplication): Promise<ApiOrderReaction>;
}

export type PaymentMethod = 'online' | 'cash';
