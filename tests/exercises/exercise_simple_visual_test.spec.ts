import { test, expect } from "@playwright/test";

test("Exercise: visual test", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/contact.html");
  await expect(page).toHaveScreenshot("exercise_visual.png");
});
