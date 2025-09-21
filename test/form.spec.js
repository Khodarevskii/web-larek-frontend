import faker from "faker";
import puppeteer from "puppeteer";
const APP = "https://khodarevskii.github.io/web-larek-frontend/"
const lead = {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  message: faker.random.words()
};
let page;
let browser;
const width = 1920;
const height = 1080;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.goto(APP);
  await page.setViewport({ width, height });
});
afterAll(() => {
  browser.close();
});

 test("Корзину можно открыть", async () => {
    await page.click(".header__basket");
    await page.waitForSelector(".basket");
  }, 10000);


  test("Кнопка внутри корзины не доступна ", async () => {
    await page.waitForSelector("[disabled='disabled']");
  }, 10000);

  
  test("модальное окно можно закрыть", async () => {
   await page.click(".modal__close");
   await expect(page.$(".modal_active")).resolves.toBe(null);
  }, 10000);


   test("карточку товаров можно открыть", async () => {
    await page.click(".card");
    await page.waitForSelector(".card_full");
  }, 10000);

  test("в карточке товаров можно нажать кнопку купить товар", async () => {
    await page.click(".card__button");
  }, 10000);
  
   test("после нажатие кнопки купить товар карточка закрылась", async () => {
    await expect(page.$(".modal_active")).resolves.toBe(null);
  }, 10000);

  test("после добавление товара счетчик товара изменился ", async () => {
      await expect(page.$eval(".header__basket-counter", el => el.innerText)).resolves.toBe('1');
    }, 10000);

  test("В карточке товаров кнопка купить меняет текст после добавление в корзину ", async () => {
      await page.click(".card");
      await expect(page.$eval(".card__button", el => el.innerText)).resolves.toBe('Убрать из корзины');
      await page.click(".modal__close");
    }, 10000);

    test("после добавление товара он появился в корзине", async () => {
    await page.click(".header__basket");
    await page.waitForSelector(".basket");
    await page.waitForSelector(".basket__item");
    }, 10000);
    
    test("после добавление товара кнопка в крозине стала доступна ", async () => {
    await expect(page.$(".basket__button[disabled='disabled']")).resolves.toBe(null);
    }, 10000);

    test("товар можно удалить из корзины", async () => {
    await page.click(".card__button");
    await expect(page.$(".basket__item")).resolves.toBe(null);
    }, 10000);

  test("В карточке можно нажать кнопку убрать товар ", async () => {
       await page.click(".card");
       await page.click(".card__button");
    }, 10000);

  test("после удаление товара счетчик изменился ", async () => {
      await expect(page.$eval(".header__basket-counter", el => el.innerText)).resolves.toBe('0');
    }, 10000);


