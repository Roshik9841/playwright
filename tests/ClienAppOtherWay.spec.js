import { test, expect } from "@playwright/test";

test.only("Webst Client App login", async ({ page }) => {
  const username = page.getByPlaceholder("email@example.com");
  const password = page.getByPlaceholder("enter your passsword");

  const btn = page.getByRole("button", { name: "Login" });

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  await username.fill("roshik9841@gmail.com");
  await password.fill("Roshik9841@!");
  await btn.click();

  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();

  await page
    .locator(".card-body")
    .filter({ hasText: "ZARA COAT 3" })
    .getByRole("button", { name: " Add To Cart" })
    .click();

  await page
    .getByRole("listitem")
    .getByRole("button", { name: "Cart" })
    .click();

  await page.locator("div li").first().waitFor();

  await expect(page.getByText("ZARA COAT 3")).toBeVisible();

  await page.getByRole("button", { name: "Checkout" }).click();

  await page.getByPlaceholder("Select Country").pressSequentially("ind");

  await page.getByRole("button", { name: "India" }).nth(1).click();

  await page.getByText("Place Order ").click();

  await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
  const orderId = (
    await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
  )
    .replace(/\|/g, "")
    .trim();


  console.log(orderId);

  await page
    .getByRole("listitem")
    .getByRole("button", { name: "ORDERS" })
    .click();
  await page.locator("tbody").waitFor();
  const rows = await page
    .locator("tbody tr")
    .filter({ hasText: orderId.trim() })
    .getByRole("button", { name: "View" })
    .click();
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
  await page.pause();
});
