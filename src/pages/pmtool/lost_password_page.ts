import { Page, Locator } from "@playwright/test";
import { LoginPage } from "./login_page";

export class LostPasswordPage {
  //properties
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly sendButton: Locator;
  readonly backButton: Locator;

  //constructor
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.emailInput = page.locator('input[name="email"]');
    this.sendButton = page.locator('button[type="submit"]');
    this.backButton = page.locator("#back-btn");
  }

  //methods
  async typeUsername(username: string): Promise<this> {
    await this.usernameInput.fill(username);
    return this;
  }

  async typeEmail(email: string): Promise<this> {
    await this.emailInput.fill(email);
    return this;
  }

  async clickSend(): Promise<LoginPage> {
    await this.sendButton.click();
    return new LoginPage(this.page);
  }

  async clickBack(): Promise<LoginPage> {
    await this.backButton.click();
    return new LoginPage(this.page);
  }
}
