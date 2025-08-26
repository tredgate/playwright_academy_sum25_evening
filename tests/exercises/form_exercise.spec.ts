import { expect, test } from "@playwright/test"

test.describe("Fill form exercise", () => {
    test("Fill form", async ({ page }) => {
        await page.goto("https://tredgate.com/webtrain/contact.html");
        await page.locator("#full-name").fill("John Doe");
        await page.locator("#email").fill("john.doe@email.com");
        await page.locator("#contact-date").fill("2002-01-01");
        await page.locator('[data-testid="select-role"]').selectOption('instructor');
        await page.locator('[data-testid="textarea-comments"]').fill('This is comment');
        await page.locator('[data-testid="checkbox-newsletter"]').check();
        await page.locator('[data-testid="button-submit"]').click();
        await expect(page.locator('[data-testid="success-box"]')).toBeVisible();
    });
})
