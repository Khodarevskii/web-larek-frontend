import { Entity } from '../base/Entity';
import { IEvents } from '../base/events';
import { 
    ICart, 
    ICartModel, 
    ICartItem, 
    IItem 
} from '../../types';
export class CartModel extends Entity<ICart> implements ICartModel {
    items = new Map<string, ICartItem>();
    constructor(events: IEvents) {
        super({items: [], total: 0, count: 0}, events);
    }
    add(product: IItem): void {
        if (product.price === null) {
            return; 
        }
        if (this.items.has(product.id)) {
            return; 
        }
        this.items.set(product.id, {
            product,
            quantity: 1
        });
        this.emitChanges('cart:updated', {
            items: this.getItems(),
            total: this.getTotal(),
            count: this.getCount()
        });
    }
    remove(productId: string): void {
        if (this.items.has(productId)) {
            this.items.delete(productId);
            this.emitChanges('cart:updated', {
                items: this.getItems(),
                total: this.getTotal(),
                count: this.getCount()
            });
        }
    }
    clear(): void {
        this.items.clear();
        this.emitChanges('cart:updated', {
            items: [],
            total: 0,
            count: 0
        });
    }
    getTotal(): number {
        return Array.from(this.items.values()).reduce(
            (total, item) => total + (item.product.price || 0), 
            0
        );
    }
    getCount(): number {
        return this.items.size; 
    }
    getItems(): ICartItem[] {
        return Array.from(this.items.values());
    }
    contains(productId: string): boolean {
        return this.items.has(productId);
    }
}
