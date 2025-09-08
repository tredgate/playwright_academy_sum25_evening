import { expect, test } from "@playwright/test";

// ? SIT - System Integration Tests: https://en.wikipedia.org/wiki/System_integration_testing
// ? Jsou to testy, kde používáme frontendovou část aplikace pro testování API (kontrolujeme API v Network části Devtools)
test.describe("Frontend with API Tests (SIT)", () => {
  test("Login API Check", async ({ page }) => {
    await page.goto("http://localhost:3001/");
    await page.locator('[data-testid="username"]').fill("fifka_petr");
    await page.locator('[data-testid="password"]').fill("Tredgate2023#");
    // ? Zapínáme čekání na dokončení API: Login, POZOR: nedáváme await!
    // ? Pro ověření a vytvoření regulárního výrazu můžeme použít: https://regex101.com/
    const responsePromise = page.waitForResponse(/.*\/auth\/login$/);
    // ? Provoláme akci, která spustí API call (kliknutí na tlačítko login)
    await page.locator('[data-testid="log_in"]').click();
    // ? Počkáme na odchycení API a doručení response (API je dokončená)
    await responsePromise;
    await page.locator('[data-testid="logout_button"]').click();
  });

  test("Intercepted Login API Checks", async ({ page }) => {
    await page.goto("http://localhost:3001/");
    await page.locator('[data-testid="username"]').fill("fifka_petr");
    await page.locator('[data-testid="password"]').fill("Tredgate2023#");
    const responsePromise = page.waitForResponse(/.*\/auth\/login$/);
    await page.locator('[data-testid="log_in"]').click();
    const loginResponse = await responsePromise;
    const loginRequest = loginResponse.request();

    // * Kontrola Login requestu
    await test.step("Login Request Checks", async () => {
      expect(loginRequest.method(), "Login request have POST method").toBe(
        "POST"
      );
      const loginRequestBody = await loginRequest.postDataJSON();
      expect(
        loginRequestBody,
        "Login Request have 'username' property"
      ).toHaveProperty("username");
      expect(
        loginRequestBody,
        "Login Request have 'password' property"
      ).toHaveProperty("password");
      expect(
        typeof loginRequestBody.username,
        "Login Request body.username is a String"
      ).toBe("string");
      expect(
        typeof loginRequestBody.password,
        "Login Request body.password is a String"
      ).toBe("string");
      expect(
        loginRequestBody.username,
        "Login Request body.username have value"
      ).toBe("fifka_petr");
      expect(
        loginRequestBody.password,
        "Login Request body.password have value"
      ).toBe("Tredgate2023#");
    });

    // * Kontrola Login response
    await test.step("Login Response Checks", async () => {
      const loginResponseBody = await loginResponse.json();
      expect(loginResponse.status(), "Login Response have status 201").toBe(
        201
      );
      expect(
        loginResponse.statusText(),
        "Login Response have status text Created"
      ).toBe("Created");

      expect(
        loginResponseBody.access_token,
        "Login Response body.access_token is defined"
      ).toBeDefined();
      expect(
        loginResponseBody.refresh_token,
        "Login Response body.refresh_token is defined"
      ).toBeDefined();

      expect(
        typeof loginResponseBody.access_token,
        "Login Response body.access_token is a String"
      ).toBe("string");

      expect(
        typeof loginResponseBody.refresh_token,
        "Login Response body.refresh_token is a String"
      ).toBe("string");
    });
  });
});
