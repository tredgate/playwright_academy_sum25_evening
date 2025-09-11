import { test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";
import { pmtoolTexts } from "../../../src/assets/dictionary.ts";

test("Using dictionaries for reusing texts", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage
    .openPmtool()
    .then((login) => login.pageHeaderHasText(pmtoolTexts.login.header));
});
