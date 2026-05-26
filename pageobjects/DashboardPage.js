class DashboardPage
{
constructor(page)
{
    this.page = page;
    this.products = page.locator(".card-body");
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");

}

async searchProductAddCart(productName)
{
    await this.productsText.first().waitFor({ state: 'visible', timeout: 15000 });
    const titles = await this.productsText.allTextContents();
    console.log(titles);
    const normalizedProduct = productName.trim().toLowerCase();
    const count = await this.products.count();
    let productFound = false;
    for (let i = 0; i < count; ++i) {
        const title = (await this.products.nth(i).locator("b").textContent()).trim().toLowerCase();
        if (title === normalizedProduct) {
            // add to cart
            await this.products.nth(i).locator("text=Add To Cart").click();
            productFound = true;
            break;
        }
    }
    if (!productFound) {
        throw new Error(`Product not found on dashboard: ${productName}`);
    }
}

async navigateToOrders()
{
    await this.orders.click();
}


async navigateToCart()
{
    await this.cart.click();
}

}
module.exports = {DashboardPage};