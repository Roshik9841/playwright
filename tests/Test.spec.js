import { test, expect } from "@playwright/test";

test.only("Webst Client App login", async ({ page }) => {
  const title = Date.now();

  const eventName = "1779172166513";
  await page.goto("https://eventhub.rahulshettyacademy.com/login");
  await page.getByPlaceholder("you@email.com").fill("Roshik9841@gmail.com");
  await page.getByLabel("Password").fill("Roshik9841@!");
  await page.locator("#login-btn").click();

  await page.waitForLoadState("networkidle");

  await expect(page.getByText("Discover & Book")).toBeVisible();

  //   await page.getByRole('navigation').getByRole('link', { name: 'Manage Events' }).click();
  await page.locator("button.transition-colors").first().click();
  await page.locator("[href='/admin/events']").first().click();

  await page.locator("#event-title-input").fill(String(title));
  await page
    .locator("#admin-event-form textarea")
    .fill("This is the description ");
  await page.locator("#city").fill("Kathmandu");
  await page.getByLabel("Venue").fill("Hotel Annapurna");
  await page.getByLabel("Event Date & Time").fill(futureDateValue());
  await page.locator("#category").selectOption("Sports");
  await page.getByLabel("Price ($)").fill("100");
  await page.getByLabel("Total Seats").fill("50");
  await page.locator("#add-event-btn").click();
  await page.locator("[href='/events']").first().click();
  await page.locator("#event-card").first().waitFor();
  console.log(await page.locator("#event-card h3").allTextContents());

  const eventCard =  page
    .locator("#event-card")
    .filter({ hasText: eventName });
console.log(await eventCard.locator("span").count());
    const seats = await eventCard.locator("span").last().textContent();
    const seatBeforeBooking = seats.match(/\d+/)[0];
    await eventCard.locator("#book-now-btn").click();
   

  await expect(page.locator("#ticket-count")).toHaveText("1");
  await page.getByLabel("Full Name").fill("Roshik Maharjan");
  await page.locator("#customer-email").fill("Roshik9841@gmail.com");
  await page.getByPlaceholder("+91 98765 43210").fill("9843225292");
  await page.locator("#confirm-booking").click();
  await expect(page.locator(" .booking-ref")).toBeVisible();
  const bookingRef = await page.locator(".booking-ref").textContent();
  console.log(bookingRef);
  await page.getByText("View My Bookings").click();
  await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/bookings");
  const bookingCard = await page.locator("#booking-card").filter({hasText:bookingRef});
  await expect(bookingCard).toBeVisible();
  await expect(bookingCard.locator("h3")).toHaveText(eventName);
   await page.locator("[href='/events']").first().click();
    await page.locator("#event-card").first().waitFor();
    const card2 = await page.locator("#event-card").filter({hasText:eventName});
    await expect(card2).toBeVisible();
       const seats2 = await card2.locator("span").last().textContent();
    const seatAfterBooking = seats2.match(/\d+/)[0];
    await expect(Number(seatAfterBooking)).toBeLessThan(50);

  await page.pause();
});

function futureDateValue() {
  const date = new Date();

  date.setDate(date.getDate() + 2); // 2 days in future

  return date.toISOString().slice(0, 16);
}
