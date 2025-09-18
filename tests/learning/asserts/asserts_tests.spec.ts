import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";
import { DashboardPage } from "../../../src/pages/pmtool/dashboard_page.ts";

test.describe("Asserts - Testing with Playwright", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage
      .openPmtool()
      .then((login) => login.login("pw_academy", "Playwright321!"));
  });

  test("toContainText Assert", async ({ page }) => {
    const dashboardHeader = page.locator("#welcome-page-header");

    await expect(dashboardHeader).toContainText("Vítej v testovací aplikaci");
  });

  test("toHaveText Assert", async ({ page }) => {
    const dashboardHeader = page.locator("#welcome-page-header");

    await expect(dashboardHeader).toHaveText(
      "Vítej v testovací aplikaci Tredgate"
    );
  });

  test("toBeVisible Assert", async ({ page }) => {
    await expect(page.locator(".logo img")).toBeVisible();
  });

  test("toHaveValue Assert", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const text = "TEST";

    await dashboardPage.clickProjects();
    await page.locator("[test_id='search_input']").fill(text);
    await expect(page.locator("[test_id='search_input']")).toHaveValue(text);
  });

  test("Soft Assert Test", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await expect
      .soft(page.locator("#welcome-page-header"))
      .toHaveText("Vítej v testovací aplikaci");
    await dashboardPage
      .clickProfile()
      .then((dashboard) => dashboard.clickLogoutButton());
  });
});

test.describe("Login Page Test", () => {
  test("Negative Test", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openPmtool();
    await expect(page.locator("#username")).toBeVisible();
    await expect(page.locator(".alert")).not.toBeVisible();
  });

  test("Page object Assert", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage
      .openPmtool()
      .then((login) => login.pageHeaderHasText("Login"));
  });
});
