import {test,expect} from "@playwright/test";
import { Register } from "../../pageobjects/Register";
test("Test 2",async({page})=>{
     await page.goto("http://automationexercise.com");
    const register = new Register(page);
    await register.openSignupForm();
    await page.locator("[type='email']").first().fill("Roshik9841@gmail.com");
    await page.locator("[type='password']").fill("Password123");
    await page.getByRole("button",{name:'Login'}).click();

    await page.locator("[href='/test_cases']").first().click();
    await expect(page).toHaveURL("https://automationexercise.com/test_cases");


    await page.locator("[href='/products']").first().click();
    await expect(page).toHaveURL("https://automationexercise.com/products");

});