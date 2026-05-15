const { test, expect } = require("@playwright/test");

test.only("Login", async ({ page }) => {
  const username = page.locator("#userEmail");
  const password = page.locator("#userPassword");

  const btn = page.locator("[value='Login']");

  const products = page.locator(".card-body");
  const productName = "ZARA COAT 3";

  const select = page.locator("select");

  const cart = page.locator("[routerlink*='cart']");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  const title = await page.title();
  console.log(title);

  await username.fill("roshik9841@gmail.com");
  await password.fill("Roshik9841@!");
  await btn.click();




  // await page.waitForLoadState("networkidle");
  // to wait for the page to load completely, it will wait for all the network requests to be finished

  await page.locator(".card-body b").first().waitFor();
  // to wait for the element to be visible, it will wait for the element to be visible before performing any action on it
  // , otherwise it will throw an error

  console.log(await page.locator(".card-body b").allTextContents());

  const count = await products.count();
  for (let i = 0; i < count; i++) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      await products.nth(i).locator("text = Add To Cart").click();
      break;
    }
  }
  await cart.click();
  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  // to check if the product is added to the cart, it will check if the product name is visible in the cart page, 
  // it returns a boolean value
 expect(bool).toBeTruthy();

 await page.locator("text = Checkout").click();

 





 const input = page.locator("[type='text']");
 
 await input.first().fill("4100 2100 3465 7898");
 await input.nth(1).fill("Code");
 await input.nth(2).fill("Roshik");
 await input.nth(3).fill("rahul shetty academy");
//  await page.locator("[type='submit']").click();

 await select.first().selectOption("10");
 await select.last().selectOption("20");

 await page.locator("[placeholder*='Country' ]").pressSequentially("India");
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionCount = await dropdown.locator("button").count();
  for(let i =0 ;i<optionCount;i++){
     const text = await dropdown.locator("button").nth(i).textContent();
      if(text===" India"){
        await dropdown.locator("button").nth(i).click();
        break;
      }
  }
  await expect(page.locator(".user__name label")).toHaveText("roshik9841@gmail.com");
 await page.locator(".action__submit").click(); 

 await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
 const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
 console.log(orderId);


await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
 
});
 