import { expect, test } from "@playwright/test";

test.describe("Mouse Actions Tests", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://tredgate.com/webtrain/web-actions.html");
    });
    
    test("Hover Test", async ({ page }) => {
        await page.locator("[data-testid='hover-box']").hover();
        await expect(page.locator('[data-testid="hover-message"]')).toBeVisible();
    });
    
    test("Drag and Drop", async ({ page }) => {
        const draggable = page.locator("#drag1");
        const dropzone = page.locator("#drop1");

        await dropzone.scrollIntoViewIfNeeded();
        await draggable.dragTo(dropzone);
        await expect(page.locator("#dropped-message")).toBeVisible();
    });

    test("Double click Test", async ({ page }) => {
        await page.locator('[data-testid="double-click-box"]').dblclick();
        await expect(page.locator('[data-testid="double-click-box"]')).toContainClass("action-active");
    });

    test("Click and hold", async ({ page }) => {
        const hold =  page.locator(".hold-button").click({ delay: 2000});
        await expect(page.locator(".hold-button")).toContainClass("hold-active");
        await hold;
    });

    test("iFrame test", async ({ page }) => {
        const frame = page.frameLocator('[data-testid="test-automation-iframe"]');
        await frame.locator("#name").fill("Martin");
        await expect(frame.locator("#name")).toHaveValue("Martin");
    })
    


    
    
    
});
