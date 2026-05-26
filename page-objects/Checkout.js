class Checkout {
  constructor(page,expect) {
    this.page = page;
    this.expect= expect;
    this.input = page.locator("[type='text']");
    this.select = page.locator("select");
  }

  async goToCheckout() {
    await this.expect(this.page.getByText("ZARA COAT 3")).toBeVisible();

    await this.page.getByRole("button", { name: "Checkout" }).click();
  }

  async fillCheckoutDetails(card,code,name,coupon) {
    await this.input.first().fill(card);
    await this.input.nth(1).fill(code);
    await this.input.nth(2).fill(name);
    await this.input.nth(3).fill(coupon);
    await this.select.first().selectOption("10");
    await this.select.last().selectOption("20");
    await this.page.getByPlaceholder("Select Country").pressSequentially("ind");

    await this.page.getByRole("button", { name: "India" }).nth(1).click();

    await this.page.getByText("Place Order ").click();
  }
}

export default Checkout;
