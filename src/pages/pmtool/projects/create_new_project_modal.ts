import { Locator, Page } from "@playwright/test";
import { ProjectTasksPage } from "./project_tasks_page.ts";

export class CreateNewProjectModal {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('//div[@data-testid="Name"]//input');
    this.saveButton = page.locator('//button[@type="submit"]');
  }

  async fillName(projectName: string): Promise<this> {
    await this.nameInput.fill(projectName);
    return this;
  }

  async clickSave(): Promise<ProjectTasksPage> {
    await this.saveButton.click();
    return new ProjectTasksPage(this.page);
  }
}
