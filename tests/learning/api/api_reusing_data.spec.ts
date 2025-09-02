// api_reusing_data.spec.ts
// tests/learning/api

import { test, expect } from "@playwright/test";
import { fakerCS_CZ as faker } from "@faker-js/faker";

test("Reusing Data Between API Calls", async ({ request }) => {
  const username = faker.internet.username();
  const email = faker.internet.exampleEmail();
  const password = "123456";

  const registerResponse = await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/register",
    {
      data: {
        username,
        password,
        email,
      },
    }
  );
  const registerBody = await registerResponse.json();
  // ? Tento expect není potřeba pro předání dat - pokud by ale v register API byla chyba a userId neexistovalo, test to tady odchytí a nebude pokračovat
  expect(registerBody.userId, "Register body.userId exist").toBeDefined();
  const userId = registerBody.userId;

  const userResponse = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop",
    {
      params: {
        userId,
      },
    }
  );
  const userBody = await userResponse.json();

  // * Kontrola existence prvků v body
  expect(userBody, "User body.username exist").toHaveProperty("username");
  expect(userBody, "User body.email exist").toHaveProperty("email");
  expect(userBody, "User body.userId exist").toHaveProperty("userId");
  expect(userBody, "User body.createdAt exist").toHaveProperty("createdAt");
  expect(userBody, "User body.updatedAt exist").toHaveProperty("updatedAt");
  expect(userBody, "User body.active exist").toHaveProperty("active");

  // * Kontrola typů
  expect(typeof userBody.username, "User body.username is a String").toBe(
    "string"
  );
  expect(typeof userBody.email, "User body.email is a String").toBe("string");
  expect(typeof userBody.userId, "User body.userId is a Number").toBe("number");
  expect(typeof userBody.createdAt, "User body.createdAt is a String").toBe(
    "string"
  );
  // ! Nelze zkontrolovat (typeof null vrací objekt)
  //   expect(typeof userBody.updatedAt, "User body.updatedAt is a Null").toBe(
  //     "null"
  //   );
  expect(typeof userBody.active, "User body.active is a String").toBe("number");

  // * Kontrola dat
  expect(userBody.username, "User body.username have value").toBe(username);
  expect(userBody.email, "User body.email have value").toBe(email);
  expect(userBody.updatedAt, "User body.updatedAt is null").toBe(null);
  expect(userBody.active, "User body.active have value").toBe(1);

  // Kontrola v Playwright body pomocí JSON Schema (balíčky 3. stran): https://www.mikestreety.co.uk/blog/validate-a-json-api-with-playwright-and-json-schema/
});
