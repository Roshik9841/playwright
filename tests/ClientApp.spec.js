const  {test, expect} = require('@playwright/test');

test('Login',async({page})=>{
    const username = page.locator("#userEmail");
    const password = page.locator("#userPassword");

    const btn = page.locator("[value='Login']");

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    const title = await page.title();
    console.log(title);

    await username.fill("roshik9841@gmail.com");
    await password.fill("Roshik9841@!");
    await btn.click();


    await page.waitForLoadState('networkidle'); 
    // to wait for the page to load completely, it will wait for all the network requests to be finished

    await page.locator(".card-body b").first().waitFor();
    // to wait for the element to be visible, it will wait for the element to be visible before performing any action on it
    // , otherwise it will throw an error

    console.log(await page.locator(".card-body b").allTextContents()); 

  
});



test.only('UI controls',async({page})=>{

         await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
         await page.fill("#username","rahulshettyacademy");
         await page.fill("[type='password']","Learning@830$3mK2");
  
         const dropdown = page.locator("select.form-control");
         await dropdown.selectOption("consult");

            // await page.pause(); 
            // to pause the test execution and open the Playwright Inspector, 
            // it will allow us to debug the test and see the state of the application at that point in time

            await page.locator(".radiotextsty").last().click();
            await page.locator("#okayBtn").click();
                await page.click("#signInBtn");

})
