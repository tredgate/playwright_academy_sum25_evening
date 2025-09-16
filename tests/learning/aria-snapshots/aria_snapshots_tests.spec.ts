// aria_snapshots_tests.spec.ts
// tests/learning/aria-snapshots
import { test, expect } from "@playwright/test";

const formAriaSnapshot = `
- form "Correct ARIA Form":
  - heading "Correct ARIA Form" [level=3]
  - text: "Name:"
  - textbox "Name:"
  - text: "Email:"
  - textbox "Email:"
  - text: "Password:"
  - textbox "Password:"
  - button "Submit contact form": Submit
`;

test("Aria Snapshot Test", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/aria-testing.html");
  await expect(page.locator("form.action-box")).toMatchAriaSnapshot(
    formAriaSnapshot
  );
});
