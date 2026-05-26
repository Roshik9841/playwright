// @ts-check
import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  // retries:1 , //retry failed test once
  
  /* Run tests in files in parallel */
  timeout:40*1000,  
  // For timeout and load the browser
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    headless:false,//npx playwright test --headed garnu parddaina
    screenshot: 'only-on-failure', 
    viewport: {width:720,height:720}, //mobile size ma test garna ko lagi
    ignoreHttpsErrors:true, //https error aako website ma test garna ko lagi
    permissions:["geolocation"], //geolocation permission dina ko lagi
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
       
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },  //...devices['iphone 11] for mobile testing
    // },

    
  ],


});

