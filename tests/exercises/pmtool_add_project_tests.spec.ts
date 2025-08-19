import { expect, test } from "@playwright/test";
import { LoginPage } from "src/pages/pmtool/login_page";
import { ProjectsPage } from "src/pages/pmtool/projects_page";

test("Add ptoject test", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const projectPage = new ProjectsPage(page)

    await loginPage.openPmtool()
    .then((login) => login.login("pw_academy", "Playwright321!"))
    .then((dasboard) => dasboard.clickProjects())
    await expect(page.locator(".table-scrollable table")).toBeVisible();
    await projectPage.clickAddProject();
    await expect(page.locator("div[data-testid='Name'] input")).toBeVisible();
    await expect(page.locator("button[type='submit']")).toHaveText("Save");
})
