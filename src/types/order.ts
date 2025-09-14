
import { PaymentMethod } from './api';
import { ICartItem } from './basket';
export interface IPurchase {
    payment?: PaymentMethod;
    email?: string;
    phone?: string;
    address?: string;
    items: ICartItem[];
    total: number;
}
export interface IPurchaseData {
    payment?: PaymentMethod;
    email?: string;
    phone?: string;
    address?: string;
}
export interface IPurchaseModel {
    order: IPurchaseData;
    setPayment(payment: PaymentMethod): void;
    setEmail(email: string): void;
    setPhone(phone: string): void;
    setAddress(address: string): void;
    validateOrder(): boolean;
    validateContacts(): boolean;
    clear(): void;
    getOrderData(items: ICartItem[], total: number): IPurchase;
    getOrderErrors(): string[];      
    getContactsErrors(): string[];   
    getErrors(): string[];           
}
export interface IPurchaseForm {
    payment: PaymentMethod | null;
    address: string;
}
export interface IContactForm {
    email: string;
    phone: string;
}
export interface IPurchaseResult {
    id: string;
    total: number;
}
export interface IConfirmationView {
    render(result: IPurchaseResult): HTMLElement;
}
export interface PurchaseChangeEvent {
    order: IPurchase;
    isValid: boolean;
    errors: string[];
}
export interface PurchaseSubmitEvent {
    order: IPurchase;
}
export interface PurchaseSuccessEvent {
    result: IPurchaseResult;
}
export type OrderErrors = Partial<Record<keyof IPurchase, string>>;
export type ContactsErrors = Partial<Record<keyof IContactForm, string>>;
