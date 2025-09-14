
import { ApiItem } from './api';
export interface IItem {
    id: string;
    title: string;
    description: string;
    price: number | null;
    image: string;
    category: string;
}
export interface IItemView {
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
    items: IItem[];
    total: number;
    loading: boolean;
}
export interface IGroupModel {
    products: IItem[];
    getProducts(): Promise<IItem[]>;
    getProduct(id: string): IItem | undefined;
    setProducts(products: ApiItem[]): void;
}
export interface IGroupView {
    render(catalog: IGroup): HTMLElement;
}
export interface IProductCardView {
    render(product: IItemView): HTMLElement;
    setDisabled(disabled: boolean): void;
}
export type CardType = 'gallery' | 'preview' | 'basket';
export interface ICartProductDetails extends IItemView {
    index: number;
}
