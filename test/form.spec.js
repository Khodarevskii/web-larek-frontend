import faker from "faker";
import puppeteer from "puppeteer";
const APP = "https://khodarevskii.github.io/web-larek-frontend/"
const lead = {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  address: faker.address.streetAddress(),
  phone: faker.phone.phoneNumber(),
  message: faker.random.words()
};
let page;
let browser;


beforeAll(async () => {
  browser = await puppeteer.launch({
  });
  page = await browser.newPage();
  await page.goto(APP);
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

     test("после удаление товара кнопка в крозине стала не доступна ", async () => {
    await page.waitForSelector(".basket__button[disabled='disabled']")
    await page.click(".modal__close");
    }, 10000);


  test("В карточке можно нажать кнопку убрать товар ", async () => {
       await page.click(".card");
      await page.waitForSelector(".card_full");
       await page.click(".card__button");
       await page.click(".card");
        await page.waitForSelector(".card_full");
       await page.click(".card__button");
    }, 10000);

  test("после удаление товара счетчик изменился ", async () => {
      await expect(page.$eval(".header__basket-counter", el => el.innerText)).resolves.toBe('0');
    }, 10000);

  test("после удаление товара он исчез из корзины", async () => {
    await page.click(".header__basket");
    await page.waitForSelector(".basket");
    await expect(page.$(".basket__item")).resolves.toBe(null);
    await page.click(".modal__close");
    }, 10000);

  test("при нажатие кнопки оформить в корзине появляется форма способа оплаты ", async () => {
       await page.click(".card");
       await page.waitForSelector(".card_full");
       await page.click(".card__button");
       await page.click(".header__basket");
       await page.waitForSelector(".basket");
       await page.click(".basket__button");
       await page.waitForSelector("form");
      }, 10000);

    test("Кнопка внутри формы не доступна ", async () => {
    await page.waitForSelector("[disabled='disabled']");
    }, 10000);

      test("пользователь может выбрать способ оплаты ", async () => {
       await page.click(".button_alt");
       await page.waitForSelector(".button_alt-active");
      }, 10000);

      test("пользователь может ввести совой адрес ", async () => {
    await page.click("input[name=address]");
    await page.type("input[name=address]", lead.address);
      }, 10000);

      test("после того как пользватель вел все данные кнопка стала доступна ", async () => {
    await expect(page.$("[disabled='disabled']")).resolves.toBe(null);
    }, 10000);


    test("при нажатие кнопки далее в форме, появляеться  форма контакты ", async () => {
    await page.click(".order__button");
    await page.waitForSelector("form[name='contacts']");
    }, 10000);

      test("пользователь может ввести совой email ", async () => {
    await page.click("input[name=email]");
    await page.type("input[name=email]", lead.email);
      }, 10000);

      test("пользователь может ввести совой телефон ", async () => {
    await page.click("input[name=phone]");
    await page.type("input[name=phone]", lead.phone);
      }, 10000);

      test("после того как пользватель вел все данные кнопка стала доступна ", async () => {
    await expect(page.$("[disabled='disabled']")).resolves.toBe(null);
    }, 10000);

    test("появляеться попап об успешной оплате ", async () => {
    await page.click(".button");
     await page.waitForSelector(".order-success");
    }, 10000);

