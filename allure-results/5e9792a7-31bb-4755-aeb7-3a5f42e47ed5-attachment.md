# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Network-Api\PageObjectMode.spec.js >> @WebClient App Login IPHONE 13 PRO
- Location: tests\Network-Api\PageObjectMode.spec.js:9:3

# Error details

```
Error: Cart did not load or page closed before cart items appeared: locator.waitFor: Target page, context or browser has been closed
Call log:
  - waiting for locator('div li').first() to be visible

```

# Test source

```ts
  1  | const {test, expect} = require('@playwright/test');
  2  | class CartPage
  3  | {
  4  | constructor(page)
  5  | {
  6  |     this.page = page;
  7  |     this.productsText = page.locator(".card-body b");
  8  |     this.cart =  page.locator("[routerlink*='cart']");
  9  |     this.orders = page.locator("button[routerlink*='myorders']");
  10 |     this.checkout = page.locator("text=Checkout");
  11 | 
  12 | }
  13 | 
  14 | async VerifyProductIsDisplayed(productName)
  15 | {
  16 |     try {
  17 |         await this.page.locator("div li").first().waitFor({ state: 'visible', timeout: 15000 });
  18 |     } catch (err) {
> 19 |         throw new Error('Cart did not load or page closed before cart items appeared: ' + err.message);
     |               ^ Error: Cart did not load or page closed before cart items appeared: locator.waitFor: Target page, context or browser has been closed
  20 |     }
  21 |     const productLocator = this.getProductLocator(productName);
  22 |     await expect(productLocator).toBeVisible({ timeout: 10000 });
  23 | 
  24 | }
  25 | 
  26 | async Checkout()
  27 | {
  28 |     await this.checkout.click();
  29 | }
  30 | 
  31 |  getProductLocator(productName)
  32 | {
  33 |     return  this.page.locator("h3:has-text('"+productName+"')");
  34 | }
  35 | 
  36 | }
  37 | module.exports = {CartPage};
```