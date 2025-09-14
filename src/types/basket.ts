
import { IItem } from './product';
export interface ICartItem {
    product: IItem;
    quantity: number;
}
export interface ICart {
    items: ICartItem[];
    total: number;
    count: number;
}
export interface ICartModel {
    items: Map<string, ICartItem>;
    add(product: IItem): void;
    remove(productId: string): void;
    clear(): void;
    getTotal(): number;
    getCount(): number;
    getItems(): ICartItem[];
    contains(productId: string): boolean;
}
export interface ICartView {
    render(basket: ICart): HTMLElement;
    updateCounter(count: number): void;
}
export interface ICartItemView {
    render(item: ICartItem, index: number): HTMLElement;
}
export interface CartAddEvent {
    product: IItem;
}
export interface CartRemoveEvent {
    productId: string;
}
export interface CartChangeEvent {
    items: ICartItem[];
    total: number;
    count: number;
}
