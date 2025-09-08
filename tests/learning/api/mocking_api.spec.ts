import { test, expect } from "@playwright/test";

const mockedJson = [
  {
    _id: "abcd",
    userId: 123,
    accountId: "5454",
    balance: 2500000,
    transactionLimits: {
      dailyLimit: 123456789,
      monthlyLimit: 666,
      _id: "edfgh",
    },
    accountType: "Mockujeme jako blázni",
    loginHistory: [],
    transactionHistory: [],
    createdAt: "2024-04-22T23:51:13.095Z",
    __v: 0,
  },
];

test("Mock Tests", async ({ page }) => {
  await page.route("*/**/accounts/user/**", async (interceptedApi) => {
    console.log("Mockujeme API accounts");
    await interceptedApi.fulfill({ json: mockedJson });
  });

  const username = "fifka_petr";
  const password = "Tredgate2023#";

  await page.goto("http://localhost:3001/");
  await page.locator('[data-testid="username"]').fill(username);
  await page.locator('[data-testid="password"]').fill(password);
  const responsePromise = page.waitForResponse(/.*\/auth\/login$/);
  await page.locator('[data-testid="log_in"]').click();
  await responsePromise;
  await page.locator('[data-testid="accounts_section_link"]').click();
  await expect(
    page.locator('data-testid="loader"'),
    "Wait until Loader be hidden"
  ).toBeHidden();
  await expect(page.locator('[data-testid="title"]')).toHaveText("Account");
});
