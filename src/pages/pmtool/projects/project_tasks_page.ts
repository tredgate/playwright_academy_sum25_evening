import { Locator, Page } from "@playwright/test";
import { LoginPage } from "../login_page.ts";
import { ProjectInfoPage } from "./project_info_page.ts";

export class ProjectTasksPage {
  readonly page: Page;
  readonly profileButton: Locator;
  readonly logoutButton: Locator;
  readonly projectInfoButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileButton = page.locator("#user_dropdown");
    this.logoutButton = page.locator("#logout");
    this.projectInfoButton = page.locator(".navbar-header .navbar-brand");
  }

  async clickProfile(): Promise<this> {
    await this.page.waitForTimeout(600);
    await this.profileButton.click();
    return this;
  }

  async clickLogoutButton(): Promise<LoginPage> {
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }

  async clickProjectInfo(): Promise<ProjectInfoPage> {
    await this.projectInfoButton.click();
    // TODO add import to ProjectInfoPage
    return new ProjectInfoPage(this.page);
  }
}
