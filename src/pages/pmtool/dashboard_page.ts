import { Locator, Page } from "@playwright/test";

export class DashboardPage {
  //properties
  readonly page: Page;
  readonly profileButton: Locator;
  readonly logoutButton: Locator;

  //constructor
  constructor(page: Page) {
    this.page = page;
    this.profileButton = page.locator("#user_dropdown");
    this.logoutButton = page.locator("#logout");
  }

  //methods
  async clickProfile() {
    await this.page.waitForTimeout(600); //pridávanie hard coded čakania aby sa "načítala" komponenta
    await this.profileButton.click();
  }

  async clickLogoutButton() {
    await this.logoutButton.click();
  }

  async logout() {
    await this.clickProfile();
    await this.clickLogoutButton();
  }
}
