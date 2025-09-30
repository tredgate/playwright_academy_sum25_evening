import { test, expect } from "@playwright/test";
import { getCurrentLanguage, tegbTexts } from "../../../src/i18n/i18n.ts";

test("Automated localization tests (auto language)", async ({ page }) => {
  await page.goto("https://tegb-frontend-88542200c6db.herokuapp.com/");

  // Přepnu jazyk dle aktuálního jazyka automatů
  // eslint-disable-next-line playwright/no-conditional-in-test
  switch (getCurrentLanguage()) {
    case "cs":
      await page.locator('[data-testid="cz"]').click();
      break;
    case "en":
      await page.locator('[data-testid="en"]').click();
      break;
  }

  // Ověřím placeholdery
  await expect(page.locator('[data-testid="username-input"]')).toHaveAttribute(
    "placeholder",
    tegbTexts().usernamePlaceholder
  );
  await expect(page.locator('[data-testid="password-input"]')).toHaveAttribute(
    "placeholder",
    tegbTexts().passwordPlaceholder
  );
});
