import { test, expect, request } from "@playwright/test";

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
  //Login Api
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    { data: loginPayload },
  );

  expect(loginResponse.ok()).toBeTruthy();
  const loginJsonResponse = await loginResponse.json();
  token = loginJsonResponse.token;
  console.log(token);

  //order API
  const orderResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data: orderPayload,
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTAyYmU1Njk2NWMyM2I0M2IxMWNmMjIiLCJ1c2VyRW1haWwiOiJyb3NoaWs5ODQxQGdtYWlsLmNvbSIsInVzZXJNb2JpbGUiOjk4NDMyMjUyOTIsInVzZXJSb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3NzkyNzg4NjEsImV4cCI6MTgxMDgzNjQ2MX0.uK0se_65d2cCPizqTuAkrC7W8EAkHWHgYI0Q83cM0TU",
        "Content-Type": "application/json",
      },
    },
  );
  const orderJsonResponse = await orderResponse.json();
  orderId = orderJsonResponse.orders[0];
});



test.beforeEach(() => {});

test.only("Api", async ({ page }) => {
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
