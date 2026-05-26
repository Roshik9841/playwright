import base from "@playwright/test";

export const customTest = base.test.extend({
  testDataForOrder: [{
    username: "roshik9841@gmail.com",
    password: "Roshik9841@!",
    productName: "IPHONE 13 PRO",
  }

],
});
