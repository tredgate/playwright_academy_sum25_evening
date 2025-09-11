import newProjectData from "../../../src/assets/ddt/new_project_data.json";
import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import dayjs from "dayjs";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";

test.describe("Data Driven Tests", () => {
  // ! Index musíme zadat, abychom zajistili unikátní název testu (bez něj by nám testy spadly, protože se testy v rámci jednoho describe musí jmenovat unikátně). project.description může být duplicitní, proto musíme přidat další unikátní identifikátor (index).
  newProjectData.forEach((projectData, index) => {
    test(`${index + 1} DDT: Create Project ${projectData.description}`, async ({
      page,
    }) => {
      const projectName =
        projectData.name_prefix + faker.number.int({ max: 99999 });
      const startDate = getStartDate(projectData.start_date, "YYYY-MM-DD");
      const startDateProjectInfo = getStartDate(
        projectData.start_date,
        "DD/MM/YYYY"
      );
      const addedDate = dayjs().format("DD/MM/YYYY");
      console.log("Generated project name: " + projectName);
      console.log(`Start date for ${projectData.start_date}: ${startDate}`);
      console.log(
        `Assert start date for ${projectData.start_date}: ${startDateProjectInfo}`
      );
      console.log(`Added date: ${addedDate}`);

      const loginPage = new LoginPage(page);
      await loginPage
        .openPmtool()
        .then((login) => login.login("pw_academy", "Playwright321!"))
        .then((dashboard) => dashboard.clickProjects())
        .then((projects) => projects.clickAddProject())
        .then((newProject) =>
          newProject.selectPriorityByLabel(projectData.priority)
        )
        .then((newProject) =>
          newProject.selectStatusByLabel(projectData.status)
        )
        .then((newProject) => newProject.fillName(projectName))
        .then((newProject) => newProject.fillStartDate(startDate))
        .then((newProject) => newProject.clickSave())
        .then((tasks) => tasks.clickProjectInfo())
        .then((projectInfo) => projectInfo.projectNameHaveText(projectName))
        .then((projectInfo) =>
          projectInfo.startDateHaveText(startDateProjectInfo)
        )
        .then((projectInfo) =>
          projectInfo.priorityHaveText(projectData.priority)
        )
        .then((projectInfo) => projectInfo.statusHaveText(projectData.status))
        .then((projectInfo) => projectInfo.dateAddedContainsDate(addedDate));
    });
  });
});

function getStartDate(startDate: string, format: string): string {
  let formattedStartDate = "$INVALID_DATE";
  switch (startDate) {
    case "today":
      formattedStartDate = dayjs().format(format);
      break;
    case "tomorrow":
      formattedStartDate = dayjs().add(1, "day").format(format);
      break;
    case "yesterday":
      formattedStartDate = dayjs().subtract(1, "day").format(format);
      break;
    default:
      expect(
        false,
        "Error: getStartDate() - invalid startDate string, only allowed values: 'today', 'tomorrow', 'yesterday'"
      ).toBeTruthy();
  }
  return formattedStartDate;
}
