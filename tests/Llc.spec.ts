import {test,expect} from "@playwright/test";

test.only("Playwright Special locators",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    //getByLabel is good for checkbox and radio button not for typing

    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");

    await page.getByPlaceholder("Password").fill("ABC");

    await page.getByRole("button",{name:'Submit'}).click();
    //{name:'Submit'} to filter among all the button if there are multiple button
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    await page.getByRole("link",{name:'Shop'}).click();

    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click();
    
;
})