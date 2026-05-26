import LoginPage from "./LoginPage";
import Dashboard from "./DashBoard";
import Checkout from "./Checkout";
class POManager{
    constructor(page,expect){
        this.page = page;
        this.expect = expect;   
        this.loginPage = new LoginPage(this.page);
        this.dashboard = new Dashboard(this.page);
        this.checkout = new Checkout(this.page,this.expect);
    }

    getLoginPage(){
        return this.loginPage;
    }
    getDashboard(){
        return this.dashboard;
    }
    getCheckout(){
        return this.checkout;
    }
}

export default POManager;