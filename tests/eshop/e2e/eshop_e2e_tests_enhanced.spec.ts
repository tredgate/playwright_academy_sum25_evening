import { test, expect } from "@playwright/test";
import { Homepage } from "../../../src/pages/eshop/homepage.ts";
import { ProductPage } from "../../../src/pages/eshop/product_page.ts";

test.describe(
  "Eshop E2E Tests - Enhanced Version",
  { tag: "@e2e-enhanced" },
  () => {
    let homepage: Homepage;
    let productPage: ProductPage;

    test.beforeEach(async ({ page }) => {
      homepage = new Homepage(page);
      productPage = new ProductPage(page);
    });

    test("Complete product browsing journey", { tag: "@journey" }, async () => {
      // Start at homepage and verify basic functionality
      await homepage.openAndVerifyHomepage();
      await homepage.verifyFeaturedProductsSection();

      // Navigate to iPhone product page
      await productPage.openAndVerifyIphoneProduct();
      await productPage.verifyProductBasicDetails();
    });

    test(
      "Product exploration and interaction flow",
      { tag: "@journey" },
      async ({ page }) => {
        await productPage.openIphonePage();

        // Verify comprehensive product details
        await productPage.verifyProductBasicDetails();

        // Test quantity changes
        await productPage.changeQuantityAndVerify("3");

        // Test product tabs
        await productPage.verifyProductTabsExist();
        await productPage.clickDescriptionTab();
        await expect(page.locator("#tab-description")).toBeVisible();

        // Verify breadcrumb navigation
        await productPage.verifyBreadcrumbNavigation();
      }
    );

    test("Search to product journey", { tag: "@journey" }, async () => {
      await homepage.open();
      await homepage.performSearchAndVerify("iPhone");

      // The search should find the iPhone product
      await expect(
        homepage.page.locator('h4 a:has-text("iPhone")')
      ).toBeVisible();
    });

    test(
      "Navigation menu exploration",
      { tag: "@journey" },
      async ({ page }) => {
        await homepage.open();
        await homepage.verifyNavigationStructure();

        // Test hover functionality on categories with submenus
        await homepage.hoverOverCategory("Desktops");
        await expect(
          page.locator("#menu .dropdown-menu:visible").first()
        ).toBeVisible();
      }
    );

    test("Cart and wishlist workflow", { tag: "@journey" }, async () => {
      await homepage.open();
      await homepage.verifyEmptyCartState();

      await productPage.openIphonePage();
      await expect(productPage.addToCartButton).toBeVisible();
      await expect(productPage.addToWishlistButton).toBeVisible();
    });

    test(
      "Footer navigation workflow",
      { tag: "@journey" },
      async ({ page }) => {
        await homepage.open();

        // Scroll to footer
        await homepage.footer.scrollIntoViewIfNeeded();

        // Verify footer sections
        await expect(
          page.locator('footer h5:has-text("Information")')
        ).toBeVisible();
        await expect(
          page.locator('footer h5:has-text("Customer Service")')
        ).toBeVisible();
        await expect(
          page.locator('footer h5:has-text("My Account")')
        ).toBeVisible();

        // Check important footer links
        await expect(
          page.locator('footer a:has-text("About Us")')
        ).toBeVisible();
        await expect(
          page.locator('footer a:has-text("Contact Us")')
        ).toBeVisible();
      }
    );

    test("Product image gallery interaction", { tag: "@journey" }, async () => {
      await productPage.openIphonePage();

      // Test product image gallery
      await productPage.verifyProductImageVisible();
      const imageCount = await productPage.productImages.count();
      expect(imageCount).toBeGreaterThan(1);

      // Click on different product images
      await productPage.clickProductImage(1);
      await productPage.clickProductImage(2);
    });

    test(
      "Breadcrumb navigation workflow",
      { tag: "@journey" },
      async ({ page }) => {
        await productPage.openIphonePage();

        // Verify breadcrumb exists and has correct content
        await productPage.verifyBreadcrumbNavigation();

        // Check breadcrumb structure
        await expect(page.locator(".breadcrumb a i.fa-home")).toBeVisible();
        await expect(page.locator(".breadcrumb")).toContainText("iPhone");
      }
    );
  }
);
