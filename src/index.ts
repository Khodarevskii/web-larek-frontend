import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { ProductApi } from './components/api/ProductApi';
import { CollectionModel } from './components/models/CollectionModel';
import { CartModel } from './components/models/Cart';
import { PurchaseModel } from './components/models/PurchaseModel';
import { PageView } from './components/views/PageView';
import { ItemCard } from './components/views/ItemCard';
import { Dialog } from './components/views/Dialog';
import { Cart } from './components/views/Cart';
import { PurchaseForm } from './components/views/PurchaseForm';
import { ContactForm } from './components/views/ContactForm';
import { Confirmation } from './components/views/Confirmation';
import { 
    IItem, 
    IItemView, 
    PaymentMethod, 
    ApiOrderApplication 
} from './types';
import { API_URL, CDN_URL, pageSelectors } from './utils/constants';
import { cloneTemplate, formatPrice } from './utils/utils';
const events = new EventEmitter();
const cardCatalogTemplate = document.querySelector(pageSelectors.cardCatalog) as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector(pageSelectors.cardPreview) as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector(pageSelectors.cardBasket) as HTMLTemplateElement;
const basketTemplate = document.querySelector(pageSelectors.basket) as HTMLTemplateElement;
const orderTemplate = document.querySelector(pageSelectors.order) as HTMLTemplateElement;
const contactsTemplate = document.querySelector(pageSelectors.contacts) as HTMLTemplateElement;
const successTemplate = document.querySelector(pageSelectors.success) as HTMLTemplateElement;
const api = new ProductApi(CDN_URL, API_URL);
const catalogModel = new CollectionModel(events);
const basketModel = new CartModel(events);
const orderModel = new PurchaseModel(events);
const page = new PageView(document.body, events);
const modal = new Dialog(document.querySelector('#modal-container') as HTMLElement, events);
const basket = new Cart(cloneTemplate(basketTemplate), events);
const order = new PurchaseForm(cloneTemplate(orderTemplate), events);
const contacts = new ContactForm(cloneTemplate(contactsTemplate), events);
let isBasketOpen = false;
function renderBasket() {
    const basketItems = basketModel.getItems().map((item, index) => {
        const card = new ItemCard('card', cloneTemplate(cardBasketTemplate), {
            click: () => {
                basketModel.remove(item.product.id);
            }
        });
        const cardData: Partial<IItemView> = {
            id: item.product.id,
            title: item.product.title,
            price: formatPrice(item.product.price)
        };
        card.index = index + 1;
        card.render(cardData);
        return card.container;
    });
    basket.render({
        items: basketItems,
        total: basketModel.getTotal(),
        selected: basketModel.getCount() > 0
    });
}
function createCard(product: IItem, actions?: { click: (event: MouseEvent) => void }): ItemCard {
    const cardElement = cloneTemplate(cardCatalogTemplate);
    const card = new ItemCard('card', cardElement, actions);
    return card;
}
api.getProductList()
    .then(catalogModel.setProducts.bind(catalogModel))
    .catch((error:Error) => {
        console.error('Ошибка загрузки каталога:', error);
    });
events.on('catalog:changed', () => {
    const products = catalogModel.products;
    page.catalog = products.map(product => {
        const card = createCard(product, {
            click: () => events.emit('card:select', product)
        });
        card.render({
            id: product.id,
            title: product.title,
            image: product.image,
            category: product.category,
            price: formatPrice(product.price)
        });
        return card.container;
    });
});
events.on('card:select', (product: IItem) => {
    const card = new ItemCard('card', cloneTemplate(cardPreviewTemplate), {
        click: () => {
            if (!product.price ) {
                return;
            }
            if (basketModel.contains(product.id)) {
                basketModel.remove(product.id);
            } else {
                basketModel.add(product);
            }
            modal.close();
        }
    });
    const productView: IItemView = {
        id: product.id,
        title: product.title,
        description: product.description,
        price: formatPrice(product.price),
        image: product.image,
        category: product.category,
        button: {
            text: product.price === null 
                ? 'Недоступно' 
                : basketModel.contains(product.id) ? 'Убрать из корзины' : 'В корзину',
            disabled: product.price === null
        }
    };
    modal.render({
        content: card.render(productView)
    });
});
events.on('cart:updated', () => {
    page.counter = basketModel.getCount();
    if (isBasketOpen) {
        renderBasket();
    }
});
events.on('basket:open', () => {
    isBasketOpen = true;
    renderBasket();
    modal.render({ content: basket.container });
});
events.on('order:open', () => {
    modal.render({
        content: order.render({
            valid: false,
            errors: []
        })
    });
});
events.on('order:payment-change', (data: { payment: PaymentMethod }) => {
    orderModel.setPayment(data.payment);
});
events.on('order:change', (data: { field: keyof typeof orderModel.order, value: string }) => {
    if (data.field === 'address') {
        orderModel.setAddress(data.value);
    }
    order.render({
        valid: orderModel.validateOrder(),
        errors: orderModel.getOrderErrors()
    });
});
events.on('order:submit', () => {
    if (orderModel.validateOrder()) {
        modal.render({
            content: contacts.render({
                valid: false,
                errors: []
            })
        });
    }
});
events.on('contacts:change', (data: { field: keyof typeof orderModel.order, value: string }) => {
    if (data.field === 'email') {
        orderModel.setEmail(data.value);
    } else if (data.field === 'phone') {
        orderModel.setPhone(data.value);
    }
    contacts.render({
        valid: orderModel.validateContacts(),
        errors: orderModel.getContactsErrors()
    });
});
events.on('contacts:submit', () => {
    if (orderModel.validateContacts()) {
        const orderData = orderModel.getOrderData(basketModel.getItems(), basketModel.getTotal());
        const orderRequest: ApiOrderApplication = {
            payment: orderData.payment!,
            email: orderData.email!,
            phone: orderData.phone!,
            address: orderData.address!,
            total: orderData.total,
            items: orderData.items.map(item => item.product.id)
        };
        api.orderProducts(orderRequest)
            .then((result) => {
                const success = new Confirmation(cloneTemplate(successTemplate), {
                    click: () => {
                        modal.close();
                        basketModel.clear();
                        orderModel.clear();
                    }
                });
                modal.render({
                    content: success.render({ total: result.total })
                });
            })
            .catch((error:Error) => {
                console.error('Ошибка оформления заказа:', error);
            });
    }
});
events.on('modal:open', () => {
    page.locked = true;
});
events.on('modal:close', () => {
    isBasketOpen = false;
    page.locked = false;
});