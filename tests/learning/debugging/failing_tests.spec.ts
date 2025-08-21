/*
tests/learning/debugging
failing_tests.spec.ts
*/
import { expect, test } from "@playwright/test";

test.describe("Failing tests", () => {
  test("Failing action", async ({ page }) => {
    await page.goto("http://tredgate.com/pmtool/");
    await page.locator("#username111").fill("1234");
  });

  test("Failing assert", async ({ page }) => {
    let someData;
    page.goto("http://tredgate.com/pmtool/");
    someData = { user: "bestUser" };
    await expect(
      page.locator(".form-title"),
      "Login Title have text"
    ).toHaveText("Přihlášení");
    someData = { user: "AnotherUser" };
    console.log(someData);
  });
});
