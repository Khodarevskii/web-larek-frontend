import { Api, ApiListResponse } from '../base/api';
import { 
    IproductApi, 
    ApiItem, 
    ApiOrderApplication, 
    ApiOrderReaction 
} from '../../types';
export class ProductApi extends Api implements IproductApi {
    readonly cdn: string;
    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }
    getProduct(id: string): Promise<ApiItem> {
        return this.get(`/product/${id}`).then(
            (item: ApiItem) => ({
                ...item,
                image: this.cdn + item.image
            })
        );
    }
    getProductList(): Promise<ApiItem[]> {
        return this.get('/product').then((data: ApiListResponse<ApiItem>) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image
            }))
        );
    }
    orderProducts(order: ApiOrderApplication): Promise<ApiOrderReaction> {
        return this.post('/order', order).then(
            (data: ApiOrderReaction) => data
        );
    }
}
