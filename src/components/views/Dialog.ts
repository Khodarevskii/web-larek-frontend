import { Element } from '../base/Element';
import { IEvents } from '../base/events';
interface IDialogData {
    content: HTMLElement;
}
export class Dialog extends Element<IDialogData> {
    protected _closeButton: HTMLButtonElement;
    protected _content: HTMLElement;
    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this._closeButton = container.querySelector('.modal__close') as HTMLButtonElement;
        this._content = container.querySelector('.modal__content') as HTMLElement;
        this.container.addEventListener('click', this.close.bind(this));
        this._content.addEventListener('click', (event) => event.stopPropagation());
    }
    set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }
    open(): void {
        if(!this.container.classList.contains('modal_active')){
             this.toggleClass(this.container,'modal_active')
        }
       
        this.events.emit('modal:open');
    }
    close(): void {
        this.toggleClass(this.container,'modal_active');
        this.content = null;
        this.events.emit('modal:close');
    }
    render(data: IDialogData): HTMLElement {
        super.render(data);
        this.open();
        return this.container;
    }
}