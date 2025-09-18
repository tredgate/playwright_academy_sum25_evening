import { test, expect } from "@playwright/test";
import { Homepage } from "../../../src/pages/eshop/homepage.ts";
import { ProductPage } from "../../../src/pages/eshop/product_page.ts";
import { eshopTexts } from "../../../src/assets/dictionary.ts";

test.describe("Eshop Structure Tests", { tag: "@structure" }, () => {
  let homepage: Homepage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    homepage = new Homepage(page);
    productPage = new ProductPage(page);
  });

  test.describe("Homepage Structure", () => {
    test("Header elements are present", async () => {
      await homepage.open();

      // Verify header elements
      await expect(homepage.logo).toBeVisible();
      await expect(homepage.searchInput).toBeVisible();
      await expect(homepage.searchButton).toBeVisible();
      await expect(homepage.cartButton).toBeVisible();
      await expect(homepage.loginLink).toBeVisible();
      await expect(homepage.registerLink).toBeVisible();
      await expect(homepage.wishlistLink).toBeVisible();
    });

    test("Navigation menu structure is correct", async ({ page }) => {
      await homepage.open();

      // Verify main navigation categories
      await expect(homepage.desktopsMenu).toBeVisible();
      await expect(homepage.laptopsMenu).toBeVisible();
      await expect(homepage.componentsMenu).toBeVisible();
      await expect(homepage.tabletsMenu).toBeVisible();
      await expect(homepage.phonesMenu).toBeVisible();
      await expect(homepage.camerasMenu).toBeVisible();
      await expect(homepage.mp3Menu).toBeVisible();
      await expect(homepage.softwareMenu).toBeVisible();

      // Check that categories have correct text
      await expect(homepage.desktopsMenu).toContainText(
        eshopTexts.homepage.navigation.desktops
      );
      await expect(homepage.laptopsMenu).toContainText(
        eshopTexts.homepage.navigation.laptops
      );
      await expect(homepage.componentsMenu).toContainText(
        eshopTexts.homepage.navigation.components
      );

      // Verify page is using the parameter
      await expect(page.locator("#menu")).toBeVisible();
    });

    test("Featured products section structure", async ({ page }) => {
      await homepage.open();

      // Verify featured products section
      await expect(page.locator('h3:has-text("Featured")')).toBeVisible();
      await homepage.verifyFeaturedProductsVisible();

      // Check that each featured product has required elements
      const firstProduct = homepage.featuredProducts.first();
      await expect(firstProduct.locator(".image")).toBeVisible();
      await expect(firstProduct.locator(".caption h4")).toBeVisible();
      await expect(firstProduct.locator(".price")).toBeVisible();
      await expect(
        firstProduct.locator('button[onclick*="cart.add"]')
      ).toBeVisible();
    });

    test("Slideshow structure", async ({ page }) => {
      await homepage.open();

      await homepage.verifySlideShowVisible();
      await expect(page.locator(".swiper-pagination")).toBeVisible();
      await expect(page.locator(".swiper-button-next")).toBeVisible();
      await expect(page.locator(".swiper-button-prev")).toBeVisible();
    });

    test("Footer structure", async ({ page }) => {
      await homepage.open();

      await homepage.verifyFooterVisible();

      // Verify footer sections
      await expect(
        page.locator('footer h5:has-text("Information")')
      ).toBeVisible();
      await expect(
        page.locator('footer h5:has-text("Customer Service")')
      ).toBeVisible();
      await expect(page.locator('footer h5:has-text("Extras")')).toBeVisible();
      await expect(
        page.locator('footer h5:has-text("My Account")')
      ).toBeVisible();

      // Verify footer links
      await expect(page.locator('footer a:has-text("About Us")')).toBeVisible();
      await expect(
        page.locator('footer a:has-text("Contact Us")')
      ).toBeVisible();
      await expect(page.locator('footer a:has-text("Returns")')).toBeVisible();
    });

    test("Carousel/Brand logos structure", async ({ page }) => {
      await homepage.open();

      // Verify brand carousel exists
      await expect(page.locator(".carousel")).toBeVisible();
      await expect(page.locator("#carousel0")).toBeVisible();

      // Check some brand logos are present
      await expect(page.locator('img[alt*="NFL"]')).toBeVisible();
      await expect(page.locator('img[alt*="Sony"]')).toBeVisible();
    });
  });

  test.describe("Product Page Structure", () => {
    test("Product page basic structure", async () => {
      await productPage.openIphonePage();

      // Verify main product elements
      await expect(productPage.productTitle).toBeVisible();
      await expect(productPage.productImage).toBeVisible();
      await expect(productPage.productPrice).toBeVisible();
      await expect(productPage.quantityInput).toBeVisible();
      await expect(productPage.addToCartButton).toBeVisible();
      await expect(productPage.breadcrumb).toBeVisible();
    });

    test("Product image gallery structure", async () => {
      await productPage.openIphonePage();

      await expect(productPage.thumbnails).toBeVisible();

      // Check that there are multiple product images
      const imageCount = await productPage.productImages.count();
      expect(imageCount).toBeGreaterThan(1);

      // Verify main image and thumbnails
      await expect(productPage.productImage).toBeVisible();
      await expect(productPage.productImages.first()).toBeVisible();
    });

    test("Product information structure", async () => {
      await productPage.openIphonePage();

      // Verify product details section
      await expect(productPage.brand).toBeVisible();
      await expect(productPage.productCode).toBeVisible();
      await expect(productPage.availability).toBeVisible();
      await expect(productPage.rating).toBeVisible();
    });

    test("Product tabs structure", async ({ page }) => {
      await productPage.openIphonePage();

      // Verify tabs are present
      await expect(productPage.descriptionTab).toBeVisible();
      await expect(productPage.reviewsTab).toBeVisible();

      // Verify tab content areas exist
      await expect(page.locator("#tab-description")).toBeInViewport();
      await expect(page.locator("#tab-review")).toBeInViewport();
    });

    test("Product action buttons structure", async () => {
      await productPage.openIphonePage();

      // Verify action buttons
      await expect(productPage.addToCartButton).toBeVisible();
      await expect(productPage.addToWishlistButton).toBeVisible();
      await expect(productPage.compareButton).toBeVisible();

      // Verify buttons have correct text/icons
      await expect(productPage.addToCartButton).toContainText("Add to Cart");
    });

    test("Related products structure", async ({ page }) => {
      await productPage.openIphonePage();

      // Check if related products section exists
      const relatedProductsHeader = page.locator(
        'h3:has-text("Related Products")'
      );
      await expect(relatedProductsHeader).toBeVisible();
      await productPage.verifyRelatedProductsVisible();
    });

    test("Product rating and reviews structure", async ({ page }) => {
      await productPage.openIphonePage();

      await expect(productPage.rating).toBeVisible();
      await expect(page.locator('a:has-text("0 reviews")')).toBeVisible();
      await expect(productPage.writeReviewLink).toBeVisible();
    });
  });

  test.describe("Responsive Elements", () => {
    test("Mobile navigation elements", async ({ page }) => {
      await homepage.open();

      // Check mobile-specific elements exist (even if not visible on desktop)
      await expect(page.locator(".navbar-toggle")).toBeInViewport();
      await expect(page.locator("#category.visible-xs")).toBeInViewport();
    });

    test("Hidden/visible elements by screen size", async ({ page }) => {
      await homepage.open();

      // Check elements that should be hidden on smaller screens
      const hiddenOnSmall = page.locator(".hidden-xs.hidden-sm.hidden-md");
      expect(await hiddenOnSmall.count()).toBeGreaterThan(0);
    });
  });
});
