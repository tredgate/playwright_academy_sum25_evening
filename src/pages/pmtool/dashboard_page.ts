import { Locator, Page } from "@playwright/test";
import { LoginPage } from "./login_page";
import { ProjectsPage } from "./projects_page.ts";

export class DashboardPage {
  //properties
  readonly page: Page;
  readonly profileButton: Locator;
  readonly logoutButton: Locator;
  readonly projectsButton: Locator;

  //constructor
  constructor(page: Page) {
    this.page = page;
    this.profileButton = page.locator("#user_dropdown");
    this.logoutButton = page.locator("#logout");
    this.projectsButton = page.locator("#Projects");
  }

  async clickProjects(): Promise<ProjectsPage> {
    await this.projectsButton.click();
    return new ProjectsPage(this.page);
  }

  /*
  ⌛10:00
    Složka
    projekt/tests/exercises
    Soubor
    exercise_add_project.spec.ts
    Kroky
    Přihlášení
    Kliknutí na Projects
    Vytvoření projektu (name pomocí Faker)
    Odhlášení
  */
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
