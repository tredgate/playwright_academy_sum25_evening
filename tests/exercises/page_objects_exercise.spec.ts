import { test } from "@playwright/test";
import { DashboardPage } from "src/pages/pmtool/dashboard_page";
import { LoginPage } from "src/pages/pmtool/login_page";

test("PageObjects Exercise - Login and Logout", async ({ page }) => {
  //test code
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.openPmtool();
  await loginPage.login("pw_academy", "Playwright321!");
  await dashboardPage.clickProfile();
  await dashboardPage.clickLogoutButton();
  //await dashboardPage.logout();
});
