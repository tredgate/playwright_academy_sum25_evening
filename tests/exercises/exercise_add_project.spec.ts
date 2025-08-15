import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { LoginPage } from "../../src/pages/pmtool/login_page.ts";

test("Exercise: Add Project", async ({ page }) => {
  const projectName =
    faker.animal.petName() + "_" + faker.number.int({ min: 10, max: 100000 });

  const loginPage = new LoginPage(page);

  await loginPage
    .openPmtool()
    .then((login) => login.login("pw_academy", "Playwright321!"))
    .then((dashboard) => dashboard.clickProjects())
    .then((projects) => projects.clickAddProject())
    .then((newProject) => newProject.fillName(projectName))
    .then((newProject) => newProject.clickSave())
    .then((tasks) => tasks.clickProfile())
    .then((tasks) => tasks.clickLogoutButton());
});
