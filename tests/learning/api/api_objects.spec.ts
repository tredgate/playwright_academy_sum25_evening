import { test, expect } from "@playwright/test";
import { fakerCS_CZ as faker } from "@faker-js/faker";
import { UserApi } from "../../../src/api/tegb/user_api.ts";

test("Using API Objects", async ({ request }) => {
  const username = faker.internet.username();
  const email = faker.internet.email();
  const password = faker.internet.password();
  const userApi = new UserApi(request);

  const registerResponse = await userApi.registerUser(
    username,
    password,
    email
  );
  const loginResponse = await userApi.loginUser(username, password);

  expect(registerResponse.status(), "Register Response Status is 201").toBe(
    201
  );
  expect(
    loginResponse.statusText(),
    "Login Response Status Text is 'Created'"
  ).toBe("Created");
});
