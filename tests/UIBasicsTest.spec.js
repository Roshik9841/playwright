const  {test, expect} = require('@playwright/test');


test('First Playwright Test',  async ({browser}) => { 
    //browser is coming from the test function, we can use it to create a new 
    // context and page
    const context = await browser.newContext(); //like incognito mode 
    const page = await context.newPage();
    await page.goto('https://www.google.com/');
});

test('Second Playwright Test',  async ({page}) => { 

    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');

    const cardTitles = page.locator(".card-body a"); // to get all the links in the card body
    //page is coming from the test function, we can use it directly
    //  to navigate to the url
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const title = await page.title();
    console.log(title);
    // await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy'); 

    await userName.fill("rahulshettyaaszxcademy");  
    //locator is a method to find the element,
    //  it returns a locator object, we can use it to perform actions on the element
    await page.locator("[type='password']").fill("Learning@830$3mK2"); // we can use css selector to find the element
    //fill is a method to enter the text in the input field
    await signIn.click();
    const errorMessage = await page.locator("[style*='block']").textContent();
    //textContent is a method to get the text of the element, it returns a string
    // [style*='block'] is a css selector to find the element which has style attribute with value containing block
    console.log(errorMessage);


    await expect(page.locator("[style*='block']")).toContainText("Incorrect"); // to check if the error message contains the text "Incorrect"

    await userName.fill(""); // to clear the input field
    await userName.fill("rahulshettyacademy");
      await signIn.click();

      //textContent has an autoWait feature, it will wait for the element to be visible before getting the text, 
    //   console.log(await cardTitles.first().textContent()); // to get the text of the first link in the card body
    // console.log(await cardTitles.nth(1).textContent()); // to get the text of the second link in the card body

   const all =  await cardTitles.allTextContents();  
   //allTextContents doesnt have an autoWait feature, so we have to wait for the element to be visible before getting the text, otherwise it will return an empty array
   // to get the text of all the links in the card body, it returns an array of strings
   console.log(all);
});






test('UI controls',async({page})=>{

         await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
         await page.fill("#username","rahulshettyacademy");
         await page.fill("[type='password']","Learning@830$3mK2");
        const documentLink = page.locator("[href*='/documents-request']");
         const dropdown = page.locator("select.form-control");
         await dropdown.selectOption("consult");

            // await page.pause(); 
            // to pause the test execution and open the Playwright Inspector, 
            // it will allow us to debug the test and see the state of the application at that point in time

            await page.locator(".radiotextsty").last().click();
            await page.locator("#okayBtn").click();

            await expect(page.locator(".radiotextsty").last()).toBeChecked(); // to check if the radio button is selected
            console.log(await page.locator(".radiotextsty").last().isChecked()); 
            // to check if the radio button is selected, it returns a boolean value

            await page.locator("#terms").check(); // to check the checkbox or click
            await expect(page.locator("#terms")).toBeChecked();

            await page.locator("#terms").uncheck();
          
            await expect(documentLink).toHaveAttribute("class","blinkingText"); 
            // to check if the link has the class attribute with value blinkingText
            await page.click("#signInBtn");

})
// console.log(await page.locator("#username").inputValue())

test('Child windows hadle',async({browser})=>{
    
        const context = await browser.newContext();
        const page = await context.newPage();
        const userName = page.locator('#username');
         await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
        const documentLink = page.locator("[href*='/documents-request']");
        const [newPage] = await Promise.all([
            
        context.waitForEvent('page'),
           // to wait for the new page to open, it will wait for the new page to open before performing
        //  any action on it, otherwise it will throw an error
          documentLink.click()]);
     
         
        const text = await  newPage.locator(".red").textContent();
        const arr = text.split("@");
        const domain = arr[1].split(" ")[0];
        console.log(domain);
        await userName.fill(domain);
        await page.pause(); 
        console.log(await page.locator("#username").inputValue())


});