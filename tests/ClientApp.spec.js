const { test, expect } = require("@playwright/test");

test.only("Login", async ({ page }) => {
  const username = page.locator("#userEmail");
  const password = page.locator("#userPassword");

  const btn = page.locator("[value='Login']");

  const products = page.locator(".card-body");
  const productName = "ZARA COAT 3";

  const cart = page.locator("[routerlink*='cart']");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  const title = await page.title();
  console.log(title);

  await username.fill("roshik9841@gmail.com");
  await password.fill("Roshik9841@!");
  await btn.click();

  await page.waitForLoadState("networkidle");
  // to wait for the page to load completely, it will wait for all the network requests to be finished

  await page.locator(".card-body b").first().waitFor();
  // to wait for the element to be visible, it will wait for the element to be visible before performing any action on it
  // , otherwise it will throw an error

  console.log(await page.locator(".card-body b").allTextContents());

  const count = await products.count();
  for (let i = 0; i < count; i++) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      await products.nth(i).locator("text = Add To Cart").click();
      break;
    }
  }
  await cart.click();
  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  // to check if the product is added to the cart, it will check if the product name is visible in the cart page, 
  // it returns a boolean value
 expect(bool).toBeTruthy();
});
