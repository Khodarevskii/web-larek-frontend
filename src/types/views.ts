
import { IEvents } from './events';
export interface IElement {
    container: HTMLElement;
    render(data?: unknown): HTMLElement;
}
export interface IDialogView {
    content: HTMLElement | null;
    open(content: HTMLElement): void;
    close(): void;
    render(data: { content: HTMLElement }): HTMLElement;
}
export interface IFormUI<T = unknown> {
    valid: boolean;
    errors: string[];
    render(data: Partial<T>): HTMLElement;
    validate(): boolean;
    clear(): void;
}
export interface IPageUI {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
    render(): HTMLElement;
}
export interface FormStatus {
    valid: boolean;
    errors: string[];
}
export interface DialogData {
    content: HTMLElement;
}
export interface ViewPageData {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}
export interface IController {
    events: IEvents;
    init(): void;
}
export type EventHandler<T = unknown> = (data?: T) => void;
export interface IEventElement extends IElement {
    events: IEvents;
}
