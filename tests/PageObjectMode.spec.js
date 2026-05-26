import { test, expect } from "@playwright/test";
import POManager from "../page-objects/POManager";

test("page object mode", async ({ page }) => {
  const userName = "roshik9841@gmail.com";
  const password = "Roshik9841@!";
  const card= "4100 2100 3465 7898";
  const code = "Code";
  const name = "Roshik";
  const coupon = "rahul shetty academy";

  const poManager = new POManager(page,expect);
  const loginPage = poManager.getLoginPage();

  await loginPage.goTo();
  await loginPage.validLogin(userName, password);

  const dashboard =  poManager.getDashboard();

  await dashboard.searchProduct("ZARA COAT 3");
  await dashboard.navigateToCart();
 
  const checkout = poManager.getCheckout();
  await checkout.goToCheckout();
  await checkout.fillCheckoutDetails(card,code,name,coupon);



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
  // await page.pause();
});
