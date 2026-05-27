
import {test, expect,type Page, type Locator} from'@playwright/test';

let message1:string = "Hello";
let isActive:boolean = true;
let arr: number[] = [1,2,3,4,5];
let data: number|string = "hello";

function sun(a:number,b:number){
    return a+b;
}

console.log(sun(2,3));

// type userType = {
//     name:string,
//     age:number,
// }
let user:{name:string,age:number} = {
    name:"Bob",
    age:34
}

class CartPage
{
    page:Page;
    productsText:Locator;
    cart:Locator;
    orders:Locator;
    checkout:Locator;
constructor(page:Page)
{
    this.page = page;
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator("text=Checkout");

}
}