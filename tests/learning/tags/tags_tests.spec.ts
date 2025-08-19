import { test } from "@playwright/test";
import { LoginPage } from "src/pages/pmtool/login_page";

test.describe("Using Tags for filter Tests", { tag: "@DescribeTag"}, () => {
    test("Tag test", { tag: "@MujTag"}, async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.openPmtool()
    });

    test("Without Tag Test", async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.openPmtool()
    }) 
})
