// more_tabs_tests.spec.ts
// tests/learning/more-tabs
import { expect, test } from "@playwright/test";

test("Create a New Page with Browser", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
  await page.locator("#username").fill("pw_academy");
  await page.locator("#password").fill("Playwright321!");
  await page.locator(".btn").click();
  await expect(page.locator("#user_notifications_report")).toBeVisible();
  await page.locator("#user_dropdown").click();
  await page.locator("#logout").click();

  // ? Založení nové záložky (okna) v prohlížeči
  const newPage = await page.context().newPage();
  await newPage.goto("https://tredgate.com/webtrain/registration.html");
  await newPage.locator("#name").fill("Test nového okna");

  // ? Můžeme i pracovat se starou záložkou (oknem)
  await page.locator("#username").fill("Staré okno");
});

test("Catching New Window", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/web-actions.html");

  // ? Začátek asynchronního čekání na událost nového okna
  const newWindowPromise = page.context().waitForEvent("page");
  // ? Tento krok klikne na odkaz, který otevře nové okno
  await page.locator('[data-testid="new-tab-link"]').click();
  // ? Čekáme na odchycení nového okna a následně ukládáme do proměnné
  const newPage = await newWindowPromise;
  newPage.locator("#name").fill("Jsem v novém okně");
  // ? Čekáme na to, aby se nám nahrál snapshot do časové lišty v Playwright UI
  await newPage.waitForTimeout(500);
});
