import { expect, test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";
import { CreateNewProjectModal } from "../../../src/pages/pmtool/projects/create_new_project_modal.ts";
import path from "path";

test.describe("Atomic Tests: Create Project Modal", () => {
  let createProjectModal: CreateNewProjectModal;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    createProjectModal = await loginPage
      .openPmtool()
      .then((login) => login.login("pw_academy", "Playwright321!"))
      .then((dashboard) => dashboard.clickProjects())
      .then((projects) => projects.clickAddProject());
  });

  test("Modal Structure Tests", async () => {
    await test.step("Title Header Tests", async () => {
      await expect.soft(createProjectModal.titleHeader).toBeVisible();
      await expect
        .soft(createProjectModal.titleHeader)
        .toHaveText("Project Info");
    });

    await test.step("Info Tab Tests", async () => {
      await expect.soft(createProjectModal.infoTab).toBeVisible();
      await expect.soft(createProjectModal.infoTab).toHaveText("Info");
    });

    await test.step("Priority Select Tests", async () => {
      await expect.soft(createProjectModal.priorityLabel).toBeVisible();
      await expect
        .soft(createProjectModal.priorityLabel)
        .toHaveText("*Priority");
      await expect.soft(createProjectModal.prioritySelect).toBeVisible();
      await createProjectModal.selectPriorityByLabel("High");
      await expect.soft(createProjectModal.prioritySelect).toHaveValue("35");
      await createProjectModal.selectPriorityByLabel("Urgent");
      await expect.soft(createProjectModal.prioritySelect).toHaveValue("34");
    });

    await test.step("Status Select Tests", async () => {
      await expect.soft(createProjectModal.statusLabel).toBeVisible();
      await expect.soft(createProjectModal.statusLabel).toHaveText("*Status");
      await expect.soft(createProjectModal.statusSelect).toBeVisible();
      await createProjectModal.selectStatusByLabel("Open");
      await expect.soft(createProjectModal.statusSelect).toHaveValue("38");
      await createProjectModal.selectStatusByLabel("New");
      await expect.soft(createProjectModal.statusSelect).toHaveValue("37");
      await createProjectModal.selectStatusByLabel("Waiting");
      await expect.soft(createProjectModal.statusSelect).toHaveValue("39");
      await createProjectModal.selectStatusByLabel("Closed");
      await expect.soft(createProjectModal.statusSelect).toHaveValue("40");
      await createProjectModal.selectStatusByLabel("Canceled");
      await expect.soft(createProjectModal.statusSelect).toHaveValue("41");
    });

    await test.step("Name Input Tests", async () => {
      await expect.soft(createProjectModal.nameLabel).toBeVisible();
      await expect.soft(createProjectModal.nameLabel).toHaveText("*Name");
      await expect.soft(createProjectModal.nameInput).toBeVisible();
      await expect.soft(createProjectModal.nameInput).toBeEnabled();
    });

    await test.step("Start Date Tests", async () => {
      await expect.soft(createProjectModal.startDateLabel).toBeVisible();
      await expect
        .soft(createProjectModal.startDateLabel)
        .toHaveText("Start Date");
      await expect.soft(createProjectModal.startDateInput).toBeVisible();
      await expect.soft(createProjectModal.startDateInput).toBeEnabled();
    });

    await test.step("Buttons Structure Tests", async () => {
      await expect.soft(createProjectModal.attachmentsLabel).toBeVisible();
      await expect
        .soft(createProjectModal.attachmentsLabel)
        .toHaveText("Attachments");
      await expect.soft(createProjectModal.attachmentsButton).toBeVisible();
      await expect
        .soft(createProjectModal.attachmentsButton)
        .toHaveText("Add Attachments");
      await expect.soft(createProjectModal.saveButton).toBeVisible();
      await expect.soft(createProjectModal.closeButton).toBeVisible();
      await expect.soft(createProjectModal.saveButton).toHaveText("Save");
      await expect.soft(createProjectModal.closeButton).toHaveText("Close");
    });
  });

  test("Name Input Validation", async () => {
    await createProjectModal.trigerNameInputValidation();
    await expect.soft(createProjectModal.nameValidationDiv).toBeVisible();
    await expect
      .soft(createProjectModal.nameValidationDiv)
      .toHaveText("This field is required!");
  });

  test("Alert Message", async () => {
    await createProjectModal.triggerAlarmMessage();
    await expect.soft(createProjectModal.alertMessageDiv).toBeVisible();
    await expect
      .soft(createProjectModal.alertMessageDiv)
      .toHaveText(
        "Some fields are required. They have been highlighted above."
      );
  });

  test("File Upload", async () => {
    const fileName = "upload_file.txt";
    const filePath = path.resolve(__dirname, "../../../src/assets/" + fileName);
    await createProjectModal.uploadFile(filePath);
    await expect(createProjectModal.firstAttachmentName).toHaveText(fileName);
  });

  test("Click Close Button", async () => {
    await createProjectModal.clickClose();
    // TODO: add assert projects page is displayed
  });

  test("Add Description iFrame", async () => {
    const descriptionText = "Test Description";
    await createProjectModal
      .fillDescription(descriptionText)
      .then((createProject) =>
        createProject.descriptionHaveText(descriptionText)
      );
  });
});
