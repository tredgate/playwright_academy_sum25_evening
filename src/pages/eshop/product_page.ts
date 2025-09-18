import { Locator, Page, expect } from "@playwright/test";

export class ProductPage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly productImage: Locator;
  readonly productImages: Locator;
  readonly productPrice: Locator;
  readonly productPriceNew: Locator;
  readonly productPriceOld: Locator;
  readonly productDescription: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly addToWishlistButton: Locator;
  readonly compareButton: Locator;
  readonly breadcrumb: Locator;
  readonly productCode: Locator;
  readonly availability: Locator;
  readonly brand: Locator;
  readonly rating: Locator;
  readonly reviewsTab: Locator;
  readonly descriptionTab: Locator;
  readonly relatedProducts: Locator;
  readonly thumbnails: Locator;
  readonly writeReviewLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = page.locator("h1");
    this.productImage = page.locator(".thumbnails li:first-child img");
    this.productImages = page.locator(".thumbnails li");
    this.productPrice = page.locator('h2:has-text("$")');
    this.productPriceNew = page.locator(".price-new");
    this.productPriceOld = page.locator(".price-old");
    this.productDescription = page.locator("#tab-description");
    this.quantityInput = page.locator("#input-quantity");
    this.addToCartButton = page.locator("#button-cart");
    this.addToWishlistButton = page.locator('button[onclick*="wishlist.add"]');
    this.compareButton = page.locator('button[onclick*="compare.add"]');
    this.breadcrumb = page.locator(".breadcrumb");
    this.productCode = page.locator('li:has-text("Product Code:")');
    this.availability = page.locator('li:has-text("Availability:")');
    this.brand = page.locator('li:has-text("Brand:")');
    this.rating = page.locator(".rating");
    this.reviewsTab = page.locator('a:has-text("Reviews")');
    this.descriptionTab = page.locator('a:has-text("Description")');
    this.relatedProducts = page.locator(".col-xs-6.col-sm-3");
    this.thumbnails = page.locator(".thumbnails");
    this.writeReviewLink = page.locator('a:has-text("Write a review")');
  }

  async open(productUrl: string): Promise<this> {
    await this.page.goto(productUrl);
    return this;
  }

  async openIphonePage(): Promise<this> {
    await this.page.goto(
      "https://tredgate.com/eshop/index.php?route=product/product&product_id=40"
    );
    return this;
  }

  async setQuantity(quantity: string): Promise<this> {
    await this.quantityInput.clear();
    await this.quantityInput.fill(quantity);
    return this;
  }

  async addToCart(): Promise<this> {
    await this.addToCartButton.click();
    return this;
  }

  async addToWishlist(): Promise<this> {
    await this.addToWishlistButton.click();
    return this;
  }

  async addToCompare(): Promise<this> {
    await this.compareButton.click();
    return this;
  }

  async clickProductImage(imageIndex: number = 0): Promise<this> {
    await this.productImages.nth(imageIndex).click();
    return this;
  }

  async clickDescriptionTab(): Promise<this> {
    await this.page.locator('a:has-text("Description")').click();
    return this;
  }

  async clickReviewsTab(): Promise<this> {
    await this.page
      .locator('a[href="#tab-review"]:has-text("Reviews")')
      .click();
    return this;
  }

  async clickRelatedProduct(index: number): Promise<this> {
    await this.relatedProducts.nth(index).locator("h4 a").click();
    return this;
  }

  // Flow methods for better test readability
  async openAndVerifyIphoneProduct(): Promise<this> {
    await this.openIphonePage();
    await expect(this.productTitle).toHaveText("iPhone");
    await this.verifyProductImageVisible();
    await this.verifyAddToCartButtonVisible();
    await this.verifyAddToCartButtonEnabled();
    return this;
  }

  async verifyProductBasicDetails(): Promise<this> {
    await expect(this.productTitle).toHaveText("iPhone");
    await expect(this.page.locator('h2:has-text("$101.00")')).toBeVisible();
    await expect(
      this.page.locator('li:has-text("Brand:") a:has-text("Apple")')
    ).toBeVisible();
    await expect(this.page.locator('li:has-text("In Stock")')).toBeVisible();
    return this;
  }

  async changeQuantityAndVerify(quantity: string): Promise<this> {
    await this.setQuantity(quantity);
    await expect(this.quantityInput).toHaveValue(quantity);
    return this;
  }

  async verifyProductTabsExist(): Promise<this> {
    await expect(this.page.locator('a:has-text("Description")')).toBeVisible();
    await expect(
      this.page.locator('a[data-toggle="tab"]:has-text("Reviews")')
    ).toBeVisible();
    await expect(this.page.locator("#tab-description")).toBeVisible();
    return this;
  }

  async verifyBreadcrumbNavigation(): Promise<this> {
    await expect(this.breadcrumb).toBeVisible();
    await expect(this.breadcrumb).toContainText("iPhone");
    return this;
  }

  async verifyProductPageLayout(): Promise<this> {
    await expect(this.productTitle).toContainText("iPhone");
    await expect(this.productImage).toBeVisible();
    await expect(this.addToCartButton).toBeVisible();
    return this;
  }

  // Assertions
  async verifyProductTitle(expectedTitle: string): Promise<this> {
    await expect(this.productTitle).toHaveText(expectedTitle);
    return this;
  }

  async verifyProductTitleContains(text: string): Promise<this> {
    await expect(this.productTitle).toContainText(text);
    return this;
  }

  async verifyProductImageVisible(): Promise<this> {
    await expect(this.productImage).toBeVisible();
    return this;
  }

  async verifyProductPrice(expectedPrice: string): Promise<this> {
    await expect(this.productPrice).toContainText(expectedPrice);
    return this;
  }

  async verifyProductCode(expectedCode: string): Promise<this> {
    await expect(this.productCode).toContainText(expectedCode);
    return this;
  }

  async verifyAvailability(expectedAvailability: string): Promise<this> {
    await expect(this.availability).toContainText(expectedAvailability);
    return this;
  }

  async verifyBrand(expectedBrand: string): Promise<this> {
    await expect(this.brand).toContainText(expectedBrand);
    return this;
  }

  async verifyAddToCartButtonVisible(): Promise<this> {
    await expect(this.addToCartButton).toBeVisible();
    return this;
  }

  async verifyAddToCartButtonEnabled(): Promise<this> {
    await expect(this.addToCartButton).toBeEnabled();
    return this;
  }

  async verifyQuantityInput(expectedValue: string): Promise<this> {
    await expect(this.quantityInput).toHaveValue(expectedValue);
    return this;
  }

  async verifyDescriptionVisible(): Promise<this> {
    await expect(this.productDescription).toBeVisible();
    return this;
  }

  async verifyDescriptionContains(text: string): Promise<this> {
    await this.clickDescriptionTab();
    await expect(this.productDescription).toContainText(text);
    return this;
  }

  async verifyBreadcrumbContains(text: string): Promise<this> {
    await expect(this.breadcrumb).toContainText(text);
    return this;
  }

  async verifyThumbnailsVisible(): Promise<this> {
    await expect(this.thumbnails).toBeVisible();
    return this;
  }

  async verifyRatingVisible(): Promise<this> {
    await expect(this.rating).toBeVisible();
    return this;
  }

  async verifyRelatedProductsVisible(): Promise<this> {
    if ((await this.relatedProducts.count()) > 0) {
      await expect(this.relatedProducts.first()).toBeVisible();
    }
    return this;
  }

  async getProductTitle(): Promise<string> {
    return (await this.productTitle.textContent()) || "";
  }

  async getProductPrice(): Promise<string> {
    return (await this.productPrice.textContent()) || "";
  }

  async getQuantity(): Promise<string> {
    return await this.quantityInput.inputValue();
  }

  // Advanced flow methods for comprehensive user journeys
  async performCompleteProductExploration(): Promise<this> {
    await this.openAndVerifyIphoneProduct();
    await this.verifyProductBasicDetails();
    await this.verifyProductTabsExist();
    await this.verifyBreadcrumbNavigation();
    return this;
  }

  async performProductInteractionFlow(): Promise<this> {
    await this.openIphonePage();
    await this.verifyProductPageLayout();

    // Test quantity changes
    await this.changeQuantityAndVerify("3");
    await this.changeQuantityAndVerify("1"); // Reset to 1

    // Explore product tabs
    await this.clickDescriptionTab();
    await this.verifyDescriptionVisible();
    await this.clickReviewsTab();
    await expect(this.page.locator("#tab-review")).toBeVisible();

    // Test product images
    await this.verifyProductImageVisible();
    const imageCount = await this.productImages.count();
    expect(imageCount).toBeGreaterThan(1);

    return this;
  }

  async verifyAllProductFeatures(): Promise<this> {
    await this.verifyProductTitle("iPhone");
    await this.verifyProductPrice("$101.00");
    await this.verifyBrand("Apple");
    await this.verifyProductCode("product 11");
    await this.verifyAvailability("In Stock");
    await this.verifyAddToCartButtonVisible();
    await this.verifyAddToCartButtonEnabled();
    await this.verifyQuantityInput("1");
    await this.verifyThumbnailsVisible();
    await this.verifyRatingVisible();
    return this;
  }

  async getCartItemCount(): Promise<string> {
    return await this.quantityInput.inputValue();
  }
}
