import {expect,Page,Locator} from '@playwright/test';
class CartPage
{
    page:Page;
    productsText:Locator;
    cart:Locator;
    orders:Locator;
    checkout:Locator;   
constructor(page:Page)
{
    this.page = page;
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator("text=Checkout");

}

async VerifyProductIsDisplayed(productName:string)
{
    try {
        await this.page.locator("div li").first().waitFor({ state: 'visible', timeout: 15000 });
    } catch (err: any) {
        throw new Error('Cart did not load or page closed before cart items appeared: ' + err.message);
    }
    const productLocator = this.getProductLocator(productName);
    await expect(productLocator).toBeVisible({ timeout: 10000 });

}

async Checkout()
{
    await this.checkout.click();
}

 getProductLocator(productName:string)
{
    return  this.page.locator("h3:has-text('"+productName+"')");
}

}
export default CartPage;