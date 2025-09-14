import { Element } from '../base/Element';
interface IConfirmation {
    total: number;
}
interface IConfirmationActions {
    click: () => void;
}
export class Confirmation extends Element<IConfirmation> {
    protected _close: HTMLButtonElement;
    protected _total: HTMLElement;
    constructor(container: HTMLElement, actions: IConfirmationActions) {
        super(container);
        this._close = container.querySelector('.order-success__close') as HTMLButtonElement;
        this._total = container.querySelector('.order-success__description') as HTMLElement;
        if (actions?.click) {
            this._close.addEventListener('click', actions.click);
        }
    }
    set total(value: number) {
        this.setText(this._total, `Списано ${value} синапсов`);
    }
}