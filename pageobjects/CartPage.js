const {test, expect} = require('@playwright/test');
class CartPage
{
constructor(page)
{
    this.page = page;
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator("text=Checkout");

}

async VerifyProductIsDisplayed(productName)
{
    try {
        await this.page.locator("div li").first().waitFor({ state: 'visible', timeout: 15000 });
    } catch (err) {
        throw new Error('Cart did not load or page closed before cart items appeared: ' + err.message);
    }
    const productLocator = this.getProductLocator(productName);
    await expect(productLocator).toBeVisible({ timeout: 10000 });

}

async Checkout()
{
    await this.checkout.click();
}

 getProductLocator(productName)
{
    return  this.page.locator("h3:has-text('"+productName+"')");
}

}
module.exports = {CartPage};