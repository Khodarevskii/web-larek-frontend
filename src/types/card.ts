
import { ApiItem } from "./api";
export interface IProductCard {
    id: string;
    title: string;
    description: string;
    price: number | null;
    image: string;
    category: string;
}
export interface IProductCardView {
    id: string;
    title: string;
    description?: string;
    price: string; 
    image: string;
    category: string;
    button?: {
        text: string;
        disabled: boolean;
    };
}
export interface IGroup {
    items: IProductCard[];
    total: number;
    loading: boolean;
}
export interface IGroupModel {
    products: IProductCard[];
    getProducts(): Promise<IProductCard[]>;
    getProduct(id: string): IProductCard | undefined;
    setProducts(products: ApiItem[]): void;
}
export interface IGroupView {
    render(catalog: IGroup): HTMLElement;
}
export interface IProductCardRender {
    render(product: IProductCardView): HTMLElement;
    setDisabled(disabled: boolean): void;
}
export type CardType = 'gallery' | 'preview' | 'basket';
export interface ICartProductDetails extends IProductCardView {
    index: number;
}
