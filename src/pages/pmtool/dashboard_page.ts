import { Locator, Page } from "@playwright/test";
import { LoginPage } from "./login_page";

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
  async clickProfile(): Promise<this> {
    await this.page.waitForTimeout(600); //pridávanie hard coded čakania aby sa "načítala" komponenta
    await this.profileButton.click();
    return this;
  }

  async clickLogoutButton(): Promise<LoginPage> {
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }

  async logout(): Promise<LoginPage> {
    await this.clickProfile();
    await this.clickLogoutButton();
    return new LoginPage(this.page);
  }
}
