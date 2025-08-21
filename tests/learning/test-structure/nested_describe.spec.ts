/*
tests/learning/test-structure
nested_describe.spec.ts
*/
import { expect, test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";

test.describe("Testování vnořených describe - Pmtool", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openPmtool();
  });

  test("První describe - pmtool assert page header", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.pageHeaderHasText("Login");
  });

  test.describe("Vnořený describe - pmtool Dashboard", () => {
    test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.login("pw_academy", "Playwright321!");
    });

    test("Pmtool Dashboard Nadpis je viditelný", async ({ page }) => {
      await expect(
        page.locator("#welcome-page-header"),
        "Dashboard Page Title is Visible"
      ).toBeVisible();
    });
  });
});
