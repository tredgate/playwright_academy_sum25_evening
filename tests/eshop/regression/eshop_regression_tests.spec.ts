import { test, expect } from "@playwright/test";
import { Homepage } from "../../../src/pages/eshop/homepage.ts";
import { ProductPage } from "../../../src/pages/eshop/product_page.ts";

test.describe("Eshop Regression Tests", { tag: "@regression" }, () => {
  let homepage: Homepage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    homepage = new Homepage(page);
    productPage = new ProductPage(page);
  });

  test.describe("Critical Business Functionality", () => {
    test(
      "Homepage critical elements remain stable",
      { tag: "@critical-regression" },
      async () => {
        await homepage.open();

        // Verify critical business elements haven't changed
        await homepage.verifyLogoIsVisible();
        await homepage.verifySearchBoxIsVisible();
        await homepage.verifyCartIsEmpty();
        await homepage.verifyFeaturedProductsVisible();

        // Verify specific featured products still exist
        await homepage.verifyProductIsDisplayed("iPhone");
        await homepage.verifyProductIsDisplayed('Apple Cinema 30"');
        await homepage.verifyProductIsDisplayed("Canon EOS 5D");

        // Verify navigation structure is intact
        await homepage.verifyNavigationMenuVisible();

        // Explicit assertion
        await expect(homepage.categoryMenus.first()).toBeVisible();
      }
    );

    test(
      "Product page core functionality intact",
      { tag: "@critical-regression" },
      async () => {
        await productPage.openIphonePage();

        // Verify product page core elements
        await productPage.verifyProductTitle("iPhone");
        await productPage.verifyProductPrice("$101.00");
        await productPage.verifyAddToCartButtonEnabled();
        await productPage.verifyQuantityInput("1");

        // Verify product information accuracy
        await productPage.verifyBrand("Apple");
        await productPage.verifyProductCode("product 11");
        await productPage.verifyAvailability("In Stock");

        // Explicit assertion
        await expect(productPage.productTitle).toHaveText("iPhone");
      }
    );

    test(
      "Navigation menu dropdowns function correctly",
      { tag: "@critical-regression" },
      async ({ page }) => {
        await homepage.open();

        // Test Desktops dropdown
        await homepage.hoverOverCategory("Desktops");
        await expect(
          page.locator('.dropdown-menu:visible a:has-text("PC")')
        ).toBeVisible();
        await expect(
          page.locator('.dropdown-menu:visible a:has-text("Mac")')
        ).toBeVisible();

        // Test Components dropdown
        await homepage.hoverOverCategory("Components");
        await expect(
          page.locator('.dropdown-menu:visible a:has-text("Monitors")')
        ).toBeVisible();
        await expect(
          page.locator(
            '.dropdown-menu:visible a:has-text("Mice and Trackballs")'
          )
        ).toBeVisible();
      }
    );

    test(
      "Search functionality maintains behavior",
      { tag: "@critical-regression" },
      async () => {
        await homepage.open();

        // Test search input accepts text
        await homepage.searchProduct("iPhone");
        await expect(homepage.searchInput).toHaveValue("iPhone");

        // Test search with different terms
        await homepage.searchProduct("Apple");
        await expect(homepage.searchInput).toHaveValue("Apple");

        // Test search can be cleared
        await homepage.searchProduct("");
        await expect(homepage.searchInput).toHaveValue("");
      }
    );
  });

  test.describe("UI/UX Consistency", () => {
    test(
      "Button styling and behavior consistent",
      { tag: "@ui-regression" },
      async () => {
        await productPage.openIphonePage();

        // Verify all buttons are properly styled and enabled
        await expect(productPage.addToCartButton).toBeEnabled();
        await expect(productPage.addToCartButton).toHaveClass(/btn/);
        await expect(productPage.addToCartButton).toHaveClass(/btn-primary/);

        await expect(productPage.addToWishlistButton).toBeEnabled();
        await expect(productPage.compareButton).toBeEnabled();

        // Verify buttons have proper icons
        await expect(
          productPage.addToCartButton.locator("i.fa-shopping-cart")
        ).toBeVisible();
        await expect(
          productPage.addToWishlistButton.locator("i.fa-heart")
        ).toBeVisible();
        await expect(
          productPage.compareButton.locator("i.fa-exchange")
        ).toBeVisible();
      }
    );

    test(
      "Typography and text content stable",
      { tag: "@ui-regression" },
      async ({ page }) => {
        await homepage.open();

        // Verify page title hasn't changed
        await expect(page).toHaveTitle(/Tredgate Obchod/);

        // Verify key text elements
        await expect(page.locator('h3:has-text("Featured")')).toBeVisible();

        // Check footer copyright text
        await expect(
          page.locator('footer p:has-text("Tredgate Obchod © 2025")')
        ).toBeVisible();
      }
    );

    test(
      "Image elements and structure maintained",
      { tag: "@ui-regression" },
      async () => {
        await productPage.openIphonePage();

        // Verify product image structure
        await expect(productPage.productImage).toBeVisible();
        await expect(productPage.thumbnails).toBeVisible();

        // Verify image count hasn't changed
        const imageCount = await productPage.productImages.count();
        expect(imageCount).toBe(6); // iPhone product should have 6 images

        // Verify main logo is present
        await homepage.open();
        await expect(homepage.logo).toBeVisible();
        await expect(homepage.logo).toHaveAttribute("alt", "Tredgate Obchod");
      }
    );

    test(
      "Form elements behavior consistent",
      { tag: "@ui-regression" },
      async () => {
        await productPage.openIphonePage();

        // Test quantity input behavior
        await expect(productPage.quantityInput).toBeEnabled();
        await expect(productPage.quantityInput).toHaveValue("1");

        // Test quantity can be changed
        await productPage.setQuantity("10");
        await expect(productPage.quantityInput).toHaveValue("10");

        // Test search input on homepage
        await homepage.open();
        await expect(homepage.searchInput).toBeEnabled();
        await expect(homepage.searchInput).toHaveAttribute(
          "placeholder",
          "Search"
        );
      }
    );
  });

  test.describe("Data Integrity", () => {
    test(
      "Product pricing information accurate",
      { tag: "@data-regression" },
      async ({ page }) => {
        await productPage.openIphonePage();

        // Verify iPhone pricing details
        await expect(page.locator('h2:has-text("$101.00")')).toBeVisible();
        await expect(
          page.locator('li:has-text("Ex Tax: $101.00")')
        ).toBeVisible();

        // Check homepage featured products pricing
        await homepage.open();
        await expect(page.locator('.price:has-text("$101.00")')).toBeVisible();
        await expect(
          page.locator('.price-new:has-text("$90.00")')
        ).toBeVisible();
        await expect(
          page.locator('.price-old:has-text("$100.00")')
        ).toBeVisible();
      }
    );

    test(
      "Product catalog information consistency",
      { tag: "@data-regression" },
      async ({ page }) => {
        await productPage.openIphonePage();

        // Verify product details consistency
        await expect(
          page.locator('li:has-text("Product Code: product 11")')
        ).toBeVisible();
        await expect(
          page.locator('li:has-text("Availability: In Stock")')
        ).toBeVisible();
        await expect(page.locator('li a:has-text("Apple")')).toBeVisible();
      }
    );

    test(
      "Navigation structure integrity",
      { tag: "@data-regression" },
      async ({ page }) => {
        await homepage.open();

        // Verify all main navigation categories exist
        const expectedCategories = [
          "Desktops",
          "Laptops & Notebooks",
          "Components",
          "Tablets",
          "Software",
          "Phones & PDAs",
          "Cameras",
          "MP3 Players",
        ];

        for (const category of expectedCategories) {
          await expect(
            page.locator(`#menu a:has-text("${category}")`)
          ).toBeVisible();
        }
      }
    );
  });

  test.describe("Performance and Accessibility", () => {
    test(
      "Page load structure remains efficient",
      { tag: "@performance-regression" },
      async () => {
        await homepage.open();

        // Verify page structure loads completely
        await expect(homepage.logo).toBeVisible();
        await expect(homepage.categoryMenus.first()).toBeVisible();
        await expect(homepage.featuredProducts.first()).toBeVisible();
        await expect(homepage.footer).toBeVisible();

        // Verify interactive elements are ready
        await expect(homepage.searchInput).toBeEnabled();
        await expect(homepage.cartButton).toBeEnabled();
      }
    );

    test(
      "Accessibility attributes maintained",
      { tag: "@a11y-regression" },
      async () => {
        await homepage.open();

        // Verify important accessibility attributes
        await expect(homepage.logo).toHaveAttribute("alt");
        await expect(homepage.searchInput).toHaveAttribute("placeholder");

        await productPage.openIphonePage();
        await expect(productPage.productImage).toHaveAttribute("alt");
        await expect(productPage.productImage).toHaveAttribute("title");
      }
    );
  });

  test.describe("Cross-Feature Integration", () => {
    test(
      "Cart integration points stable",
      { tag: "@integration-regression" },
      async ({ page }) => {
        await homepage.open();

        // Verify cart starts empty
        await expect(homepage.cartTotal).toContainText("0 item(s) - $0.00");

        // Verify cart dropdown shows empty message
        await homepage.openCart();
        await expect(
          page.locator('p:has-text("Your shopping cart is empty!")')
        ).toBeVisible();
      }
    );

    test(
      "Product and category relationship maintained",
      { tag: "@integration-regression" },
      async ({ page }) => {
        await productPage.openIphonePage();

        // Verify breadcrumb shows proper hierarchy
        await expect(page.locator(".breadcrumb a i.fa-home")).toBeVisible();
        await expect(
          page.locator('.breadcrumb a:has-text("iPhone")')
        ).toBeVisible();

        // Verify related products section exists
        await expect(
          page.locator('h3:has-text("Related Products")')
        ).toBeVisible();
        await expect(page.locator(".col-xs-6.col-sm-3")).toBeVisible();
      }
    );

    test(
      "Footer links integration working",
      { tag: "@integration-regression" },
      async ({ page }) => {
        await homepage.open();

        // Verify footer sections are properly structured
        await expect(
          page.locator('footer h5:has-text("Information")')
        ).toBeVisible();
        await expect(
          page.locator('footer h5:has-text("Customer Service")')
        ).toBeVisible();
        await expect(
          page.locator('footer h5:has-text("Extras")')
        ).toBeVisible();
        await expect(
          page.locator('footer h5:has-text("My Account")')
        ).toBeVisible();

        // Verify important footer links exist
        await expect(
          page.locator('footer a:has-text("Contact Us")')
        ).toBeVisible();
        await expect(
          page.locator('footer a:has-text("Returns")')
        ).toBeVisible();
        await expect(
          page.locator('footer a:has-text("Privacy Policy")')
        ).toBeVisible();
      }
    );
  });
});
