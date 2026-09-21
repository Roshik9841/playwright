import { test, expect, request } from "@playwright/test";
import { Register } from "../../pageobjects/Register";

test("webpage", async ({ page }) => {
  await page.goto("http://automationexercise.com");
  await expect(page).toHaveTitle("Automation Exercise");
  const register = new Register(page);
  await register.openSignupForm();
  await expect(page.locator("h2").last()).toBeVisible();
  await register.signup("Roshik", "Roshik98412@gmail.com");
  await expect(page.locator("b").first()).toBeVisible();
  await register.fillAccountDetails({
    password: "Password123",
    day: "1",
    month: "January",
    year: "2000",
    firstName: "Roshik",
    lastName: "Maharjan",
    address: "123 Main St",
    country: "Canada",
    state: "Ontario",
    city: "Toronto",
    zipcode: "M1A 2B3",
    mobileNumber: "1234567890",
  });
  await register.createAccount();
  await expect(page.locator("h2").first()).toBeVisible();
  await register.continue();

  await expect(register.accountName).toHaveText("Roshik");
  await register.deleteAccount();
  await expect(page.locator("h2").first()).toBeVisible();
  await register.continue();
});

test("api testng", async ({ page }) => {
  const response = await page.request.get(
    "https://jsonplaceholder.typicode.com/posts/1",
  );
  expect(response.status()).toBe(200);
  const data = await response.json();
  console.log(data);
});

test("api testng2", async () => {
  const apiContext = await request.newContext();

  const response = await apiContext.post(
    "https://jsonplaceholder.typicode.com/posts",
    {
      data: {
        title: "Roshik",
        body: "Learning API testing",
        userId: 1,
      },
    },
  );

  expect(response.status()).toBe(201);

  const body = await response.json();
  console.log(body);

  await apiContext.dispose();
});