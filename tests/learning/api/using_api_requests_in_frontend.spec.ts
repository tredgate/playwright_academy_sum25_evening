import { expect, test } from "@playwright/test";
import { fakerCS_CZ as faker } from "@faker-js/faker";

test.describe("Using API Requests in Frontend", () => {
  test("Register and Login via API to app", async ({ request, page }) => {
    const username = faker.internet.username();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await request.post("http://localhost:3000/user/register", {
      data: {
        username,
        email,
        password,
      },
    });

    const loginResponse = await request.post(
      "http://localhost:3000/auth/login",
      {
        data: {
          username,
          password,
        },
      }
    );
    expect(loginResponse.status(), "Login Response Status is 201").toBe(201);
    const loginResponseBody = await loginResponse.json();
    const accessToken = loginResponseBody.access_token;

    // ? Nastavíme Cookies s autorizačním tokenem, díky čemuž budeme do aplikace přihlášení
    await page.context().addCookies([
      {
        name: "access_token",
        value: accessToken,
        path: "/",
        domain: "localhost",
      },
    ]);

    await page.goto("http://localhost:3001/app");
    await expect(page.locator('[data-testid="logout_button"]')).toBeVisible();
  });
});
