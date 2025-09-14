export const API_URL = `${process.env.API_ORIGIN || 'https://larek-api.nomoreparties.co'}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN || 'https://larek-api.nomoreparties.co'}/content/weblarek`;

export const pageSelectors = {
    cardCatalog: '#card-catalog',
    cardPreview: '#card-preview',
    cardBasket: '#card-basket',
    basket: '#basket',
    order: '#order',
    contacts: '#contacts',
    success: '#success'
};
