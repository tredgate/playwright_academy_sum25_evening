import { test } from "@playwright/test";
import { LoginPage } from "src/pages/pmtool/login_page";

test("Tag Exercise", { tag: "@exercise"}, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage
    .openPmtool()
    .then((login) => login.login("pw_academy", "Playwright321!"))    
})
