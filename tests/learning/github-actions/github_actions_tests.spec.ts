import { test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";

test.describe("GitHub Actions Tests", { tag: "@github-actions" }, () => {
  const username = process.env.PMTOOL_USERNAME as string;
  const password = process.env.PMTOOL_PASSWORD as string;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openPmtool();
  });

  test("Pmtool Login", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(username, password);
  });

  test("Login and Logout from Pmtool", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage
      .login(username, password)
      .then((dashboard) => dashboard.logout());
  });
});
