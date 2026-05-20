import {test,expect,request} from '@playwright/test';
 
const loginPayload = {
    "userEmail": "roshik9841@gmail.com",
    "userPassword": "Roshik9841@!"
};

let token;

test.beforeAll(async()=>{
        const apiContext = await request.newContext();
        const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{data:loginPayload});

        expect(loginResponse.ok()).toBeTruthy();
        const loginJsonResponse = await loginResponse.json();
         token = loginJsonResponse.token;
        console.log(token);
});

test.beforeEach(()=>{

})


test.only("Api",async({page})=>{
  
    await page.addInitScript(value=>{
        window.localStorage.setItem("token",value);
    },token); //setting the token in local storage before the page loads
    await page.goto("https://rahulshettyacademy.com/client");
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

})