import { Entity } from '../base/Entity';
import { IEvents } from '../base/events';
import { 
    IItem, 
    IGroupModel, 
    ApiItem 
} from '../../types';
export class CollectionModel extends Entity<IItem[]> implements IGroupModel {
    products: IItem[] = [];
    constructor(events: IEvents) {
        super([], events);
    }
    setProducts(products: ApiItem[]): void {
        this.products = products.map(product => ({
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
            image: product.image,
            category: product.category
        }));
        this.emitChanges('catalog:changed', { products: this.products });
    }
    getProducts(): Promise<IItem[]> {
        return Promise.resolve(this.products);
    }
    getProduct(id: string): IItem | undefined {
        return this.products.find(product => product.id === id);
    }
    getTotal(): number {
        return this.products.length;
    }
}
