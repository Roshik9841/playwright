import {test,expect} from "@playwright/test";

test.only("Playwright Special locators",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    //getByLabel is good for checkbox and radio button not for typing

    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    
;
})