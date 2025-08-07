import { test } from "@playwright/test";
import { LoginPage } from "src/pages/pmtool/login_page";

test("Lost Password Test - E2E", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage
    .openPmtool()
    .then((login) => login.clickPasswordForgotten())
    .then((lostPassword) => lostPassword.typeUsername("lost_password_user"))
    .then((lostPassword) => lostPassword.typeEmail("lost_password@tredgate.cz"))
    .then((lostPassword) => lostPassword.clickSend());
});

test("Lost Password Test - Click Back", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage
    .openPmtool()
    .then((loginPage) => loginPage.clickPasswordForgotten())
    .then((lostPassword) => lostPassword.clickBack());
});
