import {test,expect} from '@playwright/test';

test("popup ",async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.on("dialog",dialog=>dialog.accept());
    // await page.on("dialog",dialog=>dialog.dismiss());  //for canceling the alert
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();

    const framesPage =  page.frameLocator("#courses-iframe");
    await framesPage.locator('li a[href*="lifetime-access"]:visible').click();
    // await page.locator(".table-responsive-lg").waitFor();
    const num = await framesPage.locator(".text h2").textContent();
    console.log(num.split(" ")[1]);

    await page.locator(".radioButton").nth(1).click();
    await page.locator("autocomplete").pressSequentially("ind");
    await page.getByRole("option", { name: "India" }).click();
    await page.locator("#dropdown-class-example").selectOption("option2");

});

test.only("Screenshot",async({page})=>{
    
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
      await expect(page.locator("#displayed-text")).toBeVisible();
      await page.locator('#displayed-text').screenshot({path:"displayed-text.png"}); //ss of specific element
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:"screenshot.png"});  // ss of entire page
    await expect(page.locator("#displayed-text")).toBeHidden();
})