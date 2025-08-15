import { test } from "@playwright/test";

test("First test", async ({ page }) => {
  //test code
  await page.goto("http://tredgate.com/pmtool/");
  await page.locator("#username").fill("pw_academy");
  await page.locator("#password").fill("Playwright321!");
  await page.locator(".btn").click();
});
/*


Vytvořte novou branch: exercise_assisted_pages
Složka
src/pages/pmtool/
Soubor
projects_page.ts
Třída
ProjectsPage


Složka
src/pages/pmtool/projects
Soubory
create_new_project_modal.ts
project_tasks_page.ts
Třídy
CreateNewProjectModal
ProjectTasksPage

**/
