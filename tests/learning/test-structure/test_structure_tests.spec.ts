import { test } from "@playwright/test"
import { LoginPage } from "src/pages/pmtool/login_page";

test.describe("Test Suite - Describe", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.openPmtool()
    })
    
    test("Pmtool login", async ({ page }) => {
        const loginPage= new LoginPage(page);
        await loginPage
        .login("pw_academy", "Playwright321!")   
    });

    test("Login and logout", async ({ page }) => {
        const loginPage= new LoginPage(page);
        await loginPage
        .login("pw_academy", "Playwright321!")
        .then((dashboard) => dashboard.clickProfile())
        .then((dashboard) => dashboard.clickLogoutButton)
    }); 
})
