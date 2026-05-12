const  {test, expect} = require('@playwright/test');


test('First Playwright Test',  async ({browser}) => { 
    //browser is coming from the test function, we can use it to create a new 
    // context and page
    const context = await browser.newContext(); //like incognito mode 
    const page = await context.newPage();
    await page.goto('https://www.google.com/');
});

test.only('Second Playwright Test',  async ({page}) => { 
    //page is coming from the test function, we can use it directly
    //  to navigate to the url
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const title = await page.title();
    console.log(title);
    // await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy'); 

    await page.locator('#username').fill("rahulshettydfgacademy");  
    //locator is a method to find the element,
    //  it returns a locator object, we can use it to perform actions on the element
    await page.locator("[type='password']").fill("learning"); // we can use css selector to find the element
    //fill is a method to enter the text in the input field
    await page.locator("#signInBtn").click();
    const errorMessage = await page.locator("[style*='block']").textContent();
    //textContent is a method to get the text of the element, it returns a string
    // [style*='block'] is a css selector to find the element which has style attribute with value containing block
    console.log(errorMessage);


    await expect(page.locator("[style*='block']")).toContainText("Incorrect"); // to check if the error message contains the text "Incorrect"

    
});