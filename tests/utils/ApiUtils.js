let token;
let orderId;

class ApiUtils {
    
  constructor(apiContext,loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

  async getToken() {
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      { data: this.loginPayload },
    );

    // expect(loginResponse.ok()).toBeTruthy();y
    const loginJsonResponse = await loginResponse.json();
    const token = loginJsonResponse.token;
    console.log(token);
    return token;
  }

  async createOrder(orderPayload) {
    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayload,
        headers: {
          Authorization: await this.getToken(),
          "Content-Type": "application/json",
        },
      },
    );
    const orderJsonResponse = await orderResponse.json();
    const orderId = orderJsonResponse.orders[0];

    return orderId;
  }
}
export default ApiUtils;
