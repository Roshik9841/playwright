# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Basics\ApiTest2.spec.js >> gmail user sees Access Denied when viewing yahoo user booking
- Location: tests\Basics\ApiTest2.spec.js:17:5

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Test source

```ts
  1  | import {test,expect} from "@playwright/test"
  2  | 
  3  | const BASE_URL = "https://eventhub.rahulshettyacademy.com";
  4  | const API_URL = `${BASE_URL}/api`;
  5  | const YAHOO_USER = {email:"Roshik9841@yahoo.com",password:"Roshik9841"};
  6  | const GMAIL_USER= {email:"Roshik9841@gmail.com",password:"Roshik9841"};
  7  | 
  8  | async function loginAs(page, user) {
  9  |   await page.goto(`${BASE_URL}/login`);
  10 |   await page.getByPlaceholder('you@email.com').fill(user.email);
  11 |   await page.getByLabel('Password').fill(user.password);
  12 |   await page.locator('#login-btn').click();
  13 |   await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
  14 | }
  15 | 
  16 | 
  17 | test('gmail user sees Access Denied when viewing yahoo user booking', async ({ page, request }) => {
  18 |  
  19 |   const loginRes = await request.post(`${API_URL}/auth/login`, {
  20 |     data: { email: YAHOO_USER.email, password: YAHOO_USER.password },
  21 |   });
> 22 |   expect(loginRes.ok()).toBeTruthy();
     |                         ^ Error: expect(received).toBeTruthy()
  23 |   const loginResJson = await loginRes.json();
  24 | const token = loginResJson.token;
  25 | 
  26 |   const eventsRes = await request.get(`${API_URL}/events`, {
  27 |     headers: { Authorization: `Bearer ${token}` },
  28 |   });
  29 |   expect(eventsRes.ok()).toBeTruthy();
  30 |   const eventsData = await eventsRes.json();
  31 |   const eventId = eventsData.data[0].id;
  32 | 
  33 | 
  34 |   const bookingRes = await request.post(`${API_URL}/bookings`, {
  35 |     headers: { Authorization: `Bearer ${token}` },
  36 |     data: {
  37 |       eventId,
  38 |       customerName:  'Yahoo User',
  39 |       customerEmail: YAHOO_USER.email,
  40 |       customerPhone: '9999999999',
  41 |       quantity:      1,
  42 |     },
  43 |   });
  44 |   expect(bookingRes.ok()).toBeTruthy();
  45 |   const yahooBookingId = (await bookingRes.json()).data.id;
  46 | 
  47 |   console.log(`Yahoo booking created via API. ID: ${yahooBookingId}`);
  48 | 
  49 |   await loginAs(page, GMAIL_USER);
  50 | 
  51 |   await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`, { waitUntil: 'networkidle' });
  52 | 
  53 |   await expect(page.getByText('Access Denied')).toBeVisible();
  54 |   await expect(page.getByText('You are not authorized to view this booking')).toBeVisible();
  55 | });
```