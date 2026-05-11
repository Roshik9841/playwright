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
    await page.goto('https://www.google.com/');

    const title = await page.title();
    console.log(title);
    await expect(page).toHaveTitle('Google');
});