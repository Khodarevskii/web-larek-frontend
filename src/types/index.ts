
export * from './api';
export * from './events';
export * from './product';
export * from './basket';
export * from './order';
export * from './views';
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;
export interface ValidationPolicy<T = unknown> {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validate?: (value: T) => boolean | string;
}
export type ValidationRules<T> = Partial<Record<keyof T, ValidationPolicy>>;
export interface ApplicationState {
    catalog: {
        products: import('./product').IItem[];
        loading: boolean;
        error?: string;
    };
    basket: import('./basket').ICart;
    order: import('./order').IPurchase;
    modal: {
        isOpen: boolean;
        content?: HTMLElement;
    };
}
