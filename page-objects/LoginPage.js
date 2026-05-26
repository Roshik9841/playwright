class LoginPage {
  constructor(page) {
    this.page = page;
    this.signInButton = page.getByRole("button", { name: "Login" });
    this.userName = page.getByPlaceholder("email@example.com");
    this.password = page.getByPlaceholder("enter your passsword");
  }

  async goTo() {
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  }
  async validLogin(username, password) {
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.signInButton.click();
  }
}
export default LoginPage;
