import {Page,expect,type Locator} from '@playwright/test';
class LoginPage {
    page:Page;
    signInbutton:Locator;
    userName:Locator;
    password:Locator;
constructor(page:Page)
{
    this.page = page;
    this.signInbutton= page.locator("[value='Login']");
    this.userName = page.locator("#userEmail");
    this.password = page.locator("#userPassword");

}

async goTo()
{
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login", { timeout: 60000, waitUntil: 'networkidle' });
}

async validLogin(username: string, password: string)
{
    await  this.userName.type(username);
     await this.password.type(password);
     await this.signInbutton.click();
     await this.page.waitForLoadState('networkidle');

}

}
export default LoginPage;