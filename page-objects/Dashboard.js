class Dashboard {
  constructor(page) {
    this.page = page;
  }

  async searchProduct(productName) {
    await this.page
      .locator(".card-body")
      .filter({ hasText: productName })
      .getByRole("button", { name: " Add To Cart" })
      .click();

  }
  async navigateToCart(){
     await this.page
      .getByRole("listitem")
      .getByRole("button", { name: "Cart" })
      .click();

    await this.page.locator("div li").first().waitFor();
  }
}
export default Dashboard;
