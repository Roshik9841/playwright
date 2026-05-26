import { test, expect, request } from "@playwright/test";
import ApiUtils from "../utils/ApiUtils";

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

const fakePayloadOrders= {"data":[],"message":"No Orders"};

let token;
let orderId;
test.beforeAll(async () => {

  const apiContext = await request.newContext();
  
    const apiUtils = new ApiUtils(apiContext,loginPayload);
    token = await apiUtils.getToken();
     orderId = await apiUtils.createOrder(orderPayload);
  });



test("Netowkr Test", async ({ page }) => {
  

  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token); //setting the token in local storage before the page loads

  await page.goto("https://rahulshettyacademy.com/client");

  
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a02be56965c23b43b11cf22",async (route)=>{
      
      //intercepting response - Api response ->  { playwright fake response} browser -> render data on frontend 
      const response = await page.request.fetch(route.request());  //original response from the server
      let body = JSON.stringify(fakePayloadOrders);
      route.fulfill({
          response,
          body,
        })
    })
    
    await page
      .getByRole("listitem")
      .getByRole("button", { name: "ORDERS" })
      .click();

  
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());
});

//verify if order created is showing in history page
//precondition - create order
