import { test, expect } from "@playwright/test";
import { ProductPage } from "../../../src/pages/eshop/product_page.ts";

test("Debug product page structure", async ({ page }) => {
  const productPage = new ProductPage(page);
  await productPage.openIphonePage();

  // Debug the price structure
  const priceElements = await page.locator("h2").all();
  for (let i = 0; i < priceElements.length; i++) {
    const text = await priceElements[i].textContent();
    console.log(`H2 element ${i}: ${text}`);
  }

  // Debug tabs
  const tabElements = await page.locator('a[href*="tab-"]').all();
  for (let i = 0; i < tabElements.length; i++) {
    const text = await tabElements[i].textContent();
    const href = await tabElements[i].getAttribute("href");
    console.log(`Tab element ${i}: ${text} - href: ${href}`);
  }

  // Simple assertion to make test pass
  await expect(page.locator("h1")).toContainText("iPhone");
});
