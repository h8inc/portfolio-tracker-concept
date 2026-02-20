const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  // 1. Overview screen
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/tmp/screen-1-overview.png', fullPage: false });
  console.log('Captured: overview');

  // 2. Diversification screen — click "View Details"
  await page.click('text=View Details');
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/tmp/screen-2-diversification.png', fullPage: false });
  console.log('Captured: diversification');

  // 3. Recommendations screen — go back then click "View Recommendations"
  await page.click('text=Back'); // try back button
  await page.waitForTimeout(600);
  await page.click('text=View Recommendations');
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/tmp/screen-3-recommendations.png', fullPage: false });
  console.log('Captured: recommendations');

  await browser.close();
  console.log('Done!');
})();
