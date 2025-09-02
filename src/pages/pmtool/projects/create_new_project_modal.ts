import { expect, Locator, Page } from "@playwright/test";
import { ProjectTasksPage } from "./project_tasks_page.ts";
import { ProjectsPage } from "../projects_page.ts";

export class CreateNewProjectModal {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly saveButton: Locator;
  readonly titleHeader: Locator;
  readonly infoTab: Locator;
  readonly priorityLabel: Locator;
  readonly statusLabel: Locator;
  readonly nameLabel: Locator;
  readonly startDateLabel: Locator;
  readonly descriptionLabel: Locator;
  readonly attachmentsLabel: Locator;
  readonly prioritySelect: Locator;
  readonly statusSelect: Locator;
  readonly startDateInput: Locator;
  readonly descriptionFrame: string;
  readonly attachmentsButton: Locator;
  readonly closeButton: Locator;
  readonly nameValidationDiv: Locator;
  readonly alertMessageDiv: Locator;
  readonly firstAttachmentName: Locator;
  readonly deleteFirstAttachmentButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('//div[@data-testid="Name"]//input');
    this.saveButton = page.locator('//button[@type="submit"]');
    this.titleHeader = page.locator(".modal-title");
    this.infoTab = page.locator('//ul[@id="form_tabs"]//li[1]');
    this.priorityLabel = page.locator(
      '//div[@data-testid="Priority"]//ancestor::div[contains(@class, "form-group")]/label'
    );
    this.statusLabel = page.locator(
      '//div[@data-testid="Status"]//ancestor::div[contains(@class, "form-group")]/label'
    );
    this.nameLabel = page.locator(
      '//div[@data-testid="Name"]//ancestor::div[contains(@class, "form-group")]/label'
    );
    this.startDateLabel = page.locator(
      '//div[@data-testid="Start Date"]//ancestor::div[contains(@class, "form-group")]/label'
    );
    this.descriptionLabel = page.locator(
      '//div[@data-testid="Description"]//ancestor::div[contains(@class, "form-group")]/label'
    );
    this.attachmentsLabel = page.locator(
      '//div[@data-testid="Attachments"]//ancestor::div[contains(@class, "form-group")]/label'
    );
    this.prioritySelect = page.locator(
      '//div[@data-testid="Priority"]//select'
    );
    this.statusSelect = page.locator('//div[@data-testid="Status"]//select');
    this.startDateInput = page.locator(
      '//div[@data-testid="Start Date"]//input'
    );
    this.descriptionFrame = '[data-testid="Description"] iframe';
    this.attachmentsButton = page.locator(
      '[data-testid="Attachments"] .btn-upload'
    );
    this.closeButton = page.locator(".btn-close");
    this.nameValidationDiv = page.locator('[data-testid="Name"] label');
    this.alertMessageDiv = page.locator(".alert");
    this.firstAttachmentName = page.locator(
      '//div[contains(@id, "uploadifive_attachments_list")]//tr[1]//td[1]'
    );
    this.deleteFirstAttachmentButton = page.locator(
      '//div[contains(@id, "uploadifive_attachments_list")]//tr[1]//label[contains(@class, "delete_attachments")]'
    );
  }

  async fillName(projectName: string): Promise<this> {
    await this.nameInput.fill(projectName);
    return this;
  }

  async clickSave(): Promise<ProjectTasksPage> {
    await this.saveButton.click();
    return new ProjectTasksPage(this.page);
  }

  async clickClose(): Promise<ProjectsPage> {
    await this.closeButton.click();
    return new ProjectsPage(this.page);
  }

  async selectPriorityByLabel(priorityLabel: string): Promise<this> {
    await this.prioritySelect.selectOption({ label: priorityLabel });
    return this;
  }

  async selectStatusByLabel(statusLabel: string): Promise<this> {
    await this.statusSelect.selectOption({ label: statusLabel });
    return this;
  }

  async fillStartDate(startDate: string): Promise<this> {
    await this.startDateInput.fill(startDate);
    return this;
  }

  async fillDescription(description: string): Promise<this> {
    const iframe = this.page.frameLocator(this.descriptionFrame);
    await iframe.locator("body").fill(description);
    return this;
  }

  async descriptionHaveText(description: string): Promise<this> {
    const iframe = this.page.frameLocator(this.descriptionFrame);
    await expect(iframe.locator("body")).toHaveText(description);
    return this;
  }

  async uploadFile(filePath: string): Promise<this> {
    const fileChooserPromise = this.page.waitForEvent("filechooser");
    await this.attachmentsButton.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
    await expect(this.deleteFirstAttachmentButton).toBeVisible();
    return this;
  }

  async trigerNameInputValidation(): Promise<this> {
    await this.nameInput.clear();
    await this.saveButton.click();
    return this;
  }

  async triggerAlarmMessage(): Promise<this> {
    await this.trigerNameInputValidation();
    return this;
  }
}
