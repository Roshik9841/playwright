
import {test as baseTest} from "@playwright/test";


interface testDataForOrder {
    username: string;
        password: string;
    productName: string;
}

export const customTest = baseTest.extend<{ testDataForOrder: testDataForOrder }>({
  testDataForOrder: [{
    username: "roshik9841@gmail.com",
    password: "Roshik9841@!",
    productName: "IPHONE 13 PRO",
  }

],
});
