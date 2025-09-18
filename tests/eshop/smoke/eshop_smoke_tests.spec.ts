import { test, expect } from "@playwright/test";
import { Homepage } from "../../../src/pages/eshop/homepage.ts";
import { ProductPage } from "../../../src/pages/eshop/product_page.ts";
import { eshopTexts } from "../../../src/assets/dictionary.ts";

test.describe("Eshop Smoke Tests", { tag: "@smoke" }, () => {
  let homepage: Homepage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    homepage = new Homepage(page);
    productPage = new ProductPage(page);
  });

  test("Homepage loads successfully", { tag: "@critical" }, async () => {
    await homepage.open();

    await homepage.verifyPageTitle();
    await homepage.verifyLogoIsVisible();
    await homepage.verifySearchBoxIsVisible();
    await homepage.verifyNavigationMenuVisible();

    // Additional explicit assertion
    await expect(homepage.logo).toBeVisible();
  });

  test("Search functionality works", { tag: "@critical" }, async () => {
    await homepage.open();

    await homepage.searchProduct("iPhone");
    // Basic verification that search was executed
    await expect(homepage.searchInput).toHaveValue("iPhone");
  });

  test("Featured products are displayed", { tag: "@critical" }, async () => {
    await homepage.open();

    await homepage.verifyFeaturedProductsVisible();
    const productsCount = await homepage.getFeaturedProductsCount();
    expect(productsCount).toBeGreaterThan(0);
  });

  test("iPhone product page loads", { tag: "@critical" }, async () => {
    await productPage.openIphonePage();

    await productPage.verifyProductTitleContains("iPhone");
    await productPage.verifyProductImageVisible();
    await productPage.verifyAddToCartButtonVisible();
    await productPage.verifyAddToCartButtonEnabled();

    // Additional explicit assertion
    await expect(productPage.productTitle).toBeVisible();
  });

  test("Cart is initially empty", { tag: "@critical" }, async () => {
    await homepage.open();

    await homepage.verifyCartIsEmpty();

    // Additional explicit assertion
    await expect(homepage.cartTotal).toContainText("0 item(s)");
  });

  test(
    "Navigation menu is functional",
    { tag: "@critical" },
    async ({ page }) => {
      await homepage.open();

      // Test hover functionality on categories with submenus
      await homepage.hoverOverCategory(eshopTexts.homepage.navigation.desktops);
      await expect(
        page.locator("#menu .dropdown-menu:visible").first()
      ).toBeVisible();
    }
  );

  test("Product details are visible", { tag: "@critical" }, async () => {
    await productPage.openIphonePage();

    await productPage.verifyProductTitle("iPhone");
    await productPage.verifyProductPrice("$101.00");
    await productPage.verifyBrand("Apple");
    await productPage.verifyAvailability("In Stock");
    await productPage.verifyProductCode("product 11");

    // Additional explicit assertion
    await expect(productPage.productTitle).toHaveText("iPhone");
  });

  test("Product quantity can be changed", { tag: "@critical" }, async () => {
    await productPage.openIphonePage();

    await productPage.setQuantity("5");
    await productPage.verifyQuantityInput("5");

    // Additional explicit assertion
    await expect(productPage.quantityInput).toHaveValue("5");
  });

  test(
    "Product tabs are functional",
    { tag: "@critical" },
    async ({ page }) => {
      await productPage.openIphonePage();

      await productPage.clickDescriptionTab();
      await productPage.verifyDescriptionVisible();

      await productPage.clickReviewsTab();
      await expect(page.locator("#tab-review")).toBeVisible();
    }
  );

  test("Breadcrumb navigation exists", { tag: "@critical" }, async () => {
    await productPage.openIphonePage();

    await productPage.verifyBreadcrumbContains("iPhone");

    // Additional explicit assertion
    await expect(productPage.breadcrumb).toBeVisible();
  });
});
