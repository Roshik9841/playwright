import { test, expect, request } from "@playwright/test";
import ApiUtils from "./utils/ApiUtils";

const loginPayload = {
  userEmail: "roshik9841@gmail.com",
  userPassword: "Roshik9841@!",
};

const orderPayload = {
  orders: [
    {
      country: "British Indian Ocean Territory",
      productOrderedId: "6960eae1c941646b7a8b3ed3",
    },
  ],
};


let token;
let orderId;
test.beforeAll(async () => {

  const apiContext = await request.newContext();
  
    const apiUtils = new ApiUtils(apiContext,loginPayload);
    token = await apiUtils.getToken();
     orderId = await apiUtils.createOrder(orderPayload);
  });



test("Api", async ({ page }) => {
  

  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token); //setting the token in local storage before the page loads

  await page.goto("https://rahulshettyacademy.com/client");

;

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
});

//verify if order created is showing in history page
//precondition - create order
