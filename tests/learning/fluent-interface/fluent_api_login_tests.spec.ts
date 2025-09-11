import { test } from "@playwright/test";
import { LoginPage } from "src/pages/pmtool/login_page";

test("Fluent Interface - Login Test", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage
    .openPmtool()
    .then((loginPage) => loginPage.fillUsername("pw_academy"))
    .then((loginPage) => loginPage.fillPassword("Playwright321!"))
    .then((loginPage) => loginPage.clickLogin())
    .then((dashBoardPage) => dashBoardPage.clickProfile())
    .then((dashboardPage) => dashboardPage.clickLogoutButton());
});
