import { test, expect } from "@playwright/test";
import path from "path";

test.describe("Forms Actions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/registration.html");
  });

  test("fill and pressSequentially Test", async ({ page }) => {
    await page.locator("#name").fill("Start");
    await page.locator("#name").fill("End");
    await page.locator("#name").pressSequentially("kde toto bude?");
    await page.locator("#name").pressSequentially("ABCD", { delay: 500 });
  });

  test("Select Test", async ({ page }) => {
    await page.locator("#gender").selectOption("female");
    await expect(page.locator("#gender")).toHaveValue("female");
    await page.locator("#gender").selectOption({ label: "Male" });
    await expect(page.locator("#gender")).toHaveValue("male");
  });

  test("checkbox, radio button Test", async ({ page }) => {
    await expect(page.locator("#contact-phone")).not.toBeChecked();
    await page.locator("#contact-phone").check();
    await expect(page.locator("#contact-phone")).toBeChecked();

    await page.locator("#interests-sports").check();
    await expect(page.locator("#interests-sports")).toBeChecked();
    await page.locator("#interests-reading").check();
    await expect(page.locator("#interests-reading")).toBeChecked();
    await page.locator("#interests-reading").uncheck();
  });

  test("date fill Test", async ({ page }) => {
    await page.locator("#date-of-birth").fill("2000-01-02");
  });

  test("File Upload Test", async ({ page }) => {
    const filePath = path.resolve(
      __dirname,
      "../../../src/assets/upload_file.txt"
    );
    // zapneme cekani na event filechooser
    const fileChooserPromise = page.waitForEvent("filechooser");

    await page.locator("#file-upload").click();

    const filechooser = await fileChooserPromise;

    await filechooser.setFiles(filePath);

    await page.waitForTimeout(2000);
  });

  test("Slider - range", async ({ page }) => {
    const experienceSlider = page.locator("#experience");

    await experienceSlider.fill("4");
    await experienceSlider.fill("1");
    await experienceSlider.fill("10");
  });
});
