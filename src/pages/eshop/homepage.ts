import { Locator, Page, expect } from "@playwright/test";
import { ProductPage } from "./product_page.ts";

export class Homepage {
  readonly page: Page;
  readonly logo: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly cartButton: Locator;
  readonly cartTotal: Locator;
  readonly loginLink: Locator;
  readonly registerLink: Locator;
  readonly wishlistLink: Locator;
  readonly featuredProducts: Locator;
  readonly slideshow: Locator;
  readonly categoryMenus: Locator;
  readonly desktopsMenu: Locator;
  readonly laptopsMenu: Locator;
  readonly componentsMenu: Locator;
  readonly tabletsMenu: Locator;
  readonly phonesMenu: Locator;
  readonly camerasMenu: Locator;
  readonly mp3Menu: Locator;
  readonly softwareMenu: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator("#logo img");
    this.searchInput = page.locator('header input[name="search"]');
    this.searchButton = page.locator("header .input-group-btn button");
    this.cartButton = page.locator("#cart button");
    this.cartTotal = page.locator("#cart-total");
    this.loginLink = page.locator('a[href*="account/login"]');
    this.registerLink = page.locator('a[href*="account/register"]');
    this.wishlistLink = page.locator('a[href*="account/wishlist"]');
    this.featuredProducts = page.locator(".product-layout");
    this.slideshow = page.locator(".slideshow");
    this.categoryMenus = page.locator("#menu .nav.navbar-nav li");
    this.desktopsMenu = page.locator('a[href*="path=20"]').first();
    this.laptopsMenu = page.locator('a[href*="path=18"]').first();
    this.componentsMenu = page.locator('a[href*="path=25"]').first();
    this.tabletsMenu = page.locator('a[href*="path=57"]');
    this.phonesMenu = page.locator('a[href*="path=24"]');
    this.camerasMenu = page.locator('a[href*="path=33"]');
    this.mp3Menu = page.locator('a[href*="path=34"]').first();
    this.softwareMenu = page.locator('a[href*="path=17"]');
    this.footer = page.locator("footer");
  }

  async open(): Promise<this> {
    await this.page.goto("https://tredgate.com/eshop/");
    return this;
  }

  async searchProduct(searchTerm: string): Promise<this> {
    await this.searchInput.fill(searchTerm);
    await this.searchButton.click();
    return this;
  }

  async clickOnProduct(productName: string): Promise<ProductPage> {
    await this.page.locator(`h4 a:has-text("${productName}")`).click();
    return new ProductPage(this.page);
  }

  async clickOnFeaturedProduct(index: number): Promise<ProductPage> {
    await this.featuredProducts.nth(index).locator("h4 a").click();
    return new ProductPage(this.page);
  }

  async addProductToCart(productName: string): Promise<this> {
    const productLocator = this.page
      .locator(".product-layout")
      .filter({ hasText: productName });
    await productLocator.locator('button[onclick*="cart.add"]').click();
    return this;
  }

  async addProductToWishlist(productName: string): Promise<this> {
    const productLocator = this.page
      .locator(".product-layout")
      .filter({ hasText: productName });
    await productLocator.locator('button[onclick*="wishlist.add"]').click();
    return this;
  }

  async clickCategory(categoryName: string): Promise<this> {
    await this.page.locator(`#menu a:has-text("${categoryName}")`).click();
    return this;
  }

  async hoverOverCategory(categoryName: string): Promise<this> {
    await this.page
      .locator(
        `#menu .nav.navbar-nav a:has-text("${categoryName}"):not(.see-all)`
      )
      .first()
      .hover();
    return this;
  }

  async clickLogin(): Promise<this> {
    await this.loginLink.click();
    return this;
  }

  async clickRegister(): Promise<this> {
    await this.registerLink.click();
    return this;
  }

  async openCart(): Promise<this> {
    await this.cartButton.click();
    return this;
  }

  // Flow methods for better test readability
  async openAndVerifyHomepage(): Promise<this> {
    await this.open();
    await expect(this.page).toHaveTitle(/Tredgate Obchod/);
    await this.verifyLogoIsVisible();
    await this.verifySearchBoxIsVisible();
    await this.verifyNavigationMenuVisible();
    return this;
  }

  async performSearchAndVerify(searchTerm: string): Promise<this> {
    await this.searchProduct(searchTerm);
    await expect(this.searchInput).toHaveValue(searchTerm);
    return this;
  }

  async verifyFeaturedProductsSection(): Promise<this> {
    await this.verifyFeaturedProductsVisible();
    const productsCount = await this.getFeaturedProductsCount();
    expect(productsCount).toBeGreaterThan(0);
    return this;
  }

  async verifyEmptyCartState(): Promise<this> {
    await this.verifyCartIsEmpty();
    await expect(this.cartTotal).toContainText("0 item(s)");
    return this;
  }

  async verifyNavigationStructure(): Promise<this> {
    await expect(this.desktopsMenu).toBeVisible();
    await expect(this.laptopsMenu).toBeVisible();
    await expect(this.componentsMenu).toBeVisible();
    await expect(this.page.locator("#menu")).toBeVisible();
    return this;
  }

  async verifyBasicPageElements(): Promise<this> {
    await expect(this.logo).toBeVisible();
    await expect(this.searchInput).toBeVisible();
    await expect(this.cartButton).toBeVisible();
    return this;
  }

  // Assertions
  async verifyPageTitle(): Promise<this> {
    await expect(this.page).toHaveTitle(/Tredgate Obchod/);
    return this;
  }

  async verifyLogoIsVisible(): Promise<this> {
    await expect(this.logo).toBeVisible();
    return this;
  }

  async verifySearchBoxIsVisible(): Promise<this> {
    await expect(this.searchInput).toBeVisible();
    return this;
  }

  async verifyCartIsEmpty(): Promise<this> {
    await expect(this.cartTotal).toContainText("0 item(s) - $0.00");
    return this;
  }

  async verifyFeaturedProductsVisible(): Promise<this> {
    await expect(this.featuredProducts.first()).toBeVisible();
    return this;
  }

  async verifyNavigationMenuVisible(): Promise<this> {
    await expect(this.categoryMenus.first()).toBeVisible();
    return this;
  }

  async verifySlideShowVisible(): Promise<this> {
    await expect(this.slideshow).toBeVisible();
    return this;
  }

  async verifyFooterVisible(): Promise<this> {
    await expect(this.footer).toBeVisible();
    return this;
  }

  async verifyProductIsDisplayed(productName: string): Promise<this> {
    await expect(
      this.page.locator(`h4 a:has-text("${productName}")`)
    ).toBeVisible();
    return this;
  }

  async getFeaturedProductsCount(): Promise<number> {
    return await this.featuredProducts.count();
  }

  // Advanced flow methods for comprehensive user journeys
  async performCompleteHomepageJourney(): Promise<this> {
    await this.openAndVerifyHomepage();
    await this.verifyFeaturedProductsSection();
    await this.verifyEmptyCartState();
    await this.verifyNavigationStructure();
    return this;
  }

  async performSearchJourney(searchTerm: string): Promise<ProductPage> {
    await this.open();
    await this.performSearchAndVerify(searchTerm);
    // After search, we should be on search results page
    await expect(
      this.page.locator('h4 a:has-text("' + searchTerm + '")')
    ).toBeVisible();
    // Click on the found product
    await this.page.locator('h4 a:has-text("' + searchTerm + '")').click();
    return new ProductPage(this.page);
  }

  async exploreNavigationMenus(): Promise<this> {
    await this.verifyNavigationStructure();

    // Test dropdowns for categories with submenus
    await this.hoverOverCategory("Desktops");
    await expect(
      this.page.locator("#menu .dropdown-menu:visible").first()
    ).toBeVisible();

    await this.hoverOverCategory("Components");
    await expect(
      this.page.locator("#menu .dropdown-menu:visible").first()
    ).toBeVisible();

    return this;
  }
}
