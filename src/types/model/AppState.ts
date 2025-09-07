import { BasketData} from '../components/view/Basket';
import { CardData} from '../components/view/Card';
import { CardBasketData} from '../components/view/CardBasket';
import { CardPreviewData} from '../components/view/CardPreview';
import { ContactsData} from '../components/view/Contacts';
import { HeaderBasketData} from '../components/view/HeaderBasket';
import { PaymentData} from '../components/view/Payment';
import { ProductData} from '../components/view/Product';
import { SuccessData} from '../components/view/Success';




export enum AppStateModals {
    Product,
    basket,
    Payment,
    contacts,
    success
}

export interface AppState{
    product?:ProductData[];
    Card:CardData;
    HeaderBasket:HeaderBasketData;
    Success:SuccessData;
    OpenModal:AppStateModals | null;
    CardPreview:CardPreviewData;
    basketProduct?:CardBasketData[];
    basket:BasketData;
    basketTotal:number;
    payment:PaymentData;
    contacts:ContactsData;
    isOrderReady:boolean;
    validationError:string|null;
    loadProduct():Promise<void>;
    openModal(modal:AppStateModals):void;
    totalCost(cost:number | null):void;
    nextModal(modal:AppStateModals):void;
    buy():void;
    deletProduct(id:number):void;
    fillContacts(contacts:Partial<ContactsData>):void;
    fillAddress(address:Partial<PaymentData>):void;
    pay():void
}

export enum AppStateChanges {
    Product,
    basket,
    Payment,
    contacts,
    success
}

export interface AppStateSettings{
    currency:string;
    storageKey:string;
    onChange:(changed:AppStateChanges) => void
}