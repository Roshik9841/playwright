 const {test, expect} = require('@playwright/test');
 const {POManager} = require('../pageobjects/POManager');
import placeorder from "../utils/placeorder.json";
import {customTest} from "../utils/test-base";

  const dataset = JSON.parse(JSON.stringify(placeorder));

  for(const data of dataset){


    test(`Client App Login ${data.productName}`, async ({page})=>
      {

   const poManager = new POManager(page);
    //js file- Login js, DashboardPage
     const username = data.username;
     const password = data.password;
     const productName = data.productName;

     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(username,password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(productName);
     await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

 });
 
}



 
customTest(`Client App Login with test data from utils`, async ({page,testDataForOrder})=>{

   const poManager = new POManager(page);
    //js file- Login js, DashboardPage
     const username = testDataForOrder.username;
     const password = testDataForOrder.password;
     const productName = testDataForOrder.productName;

     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(username,password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(productName);
     await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();



});



 

