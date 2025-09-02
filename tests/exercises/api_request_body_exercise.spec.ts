import { test } from "@playwright/test";
import { fakerCS_CZ as faker } from "@faker-js/faker";

test("Exercise: POST Request with Body", async ({ request }) => {
  const username = faker.internet.username();
  const email = faker.internet.email();
  const password = "123456";

  await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/register",
    {
      data: {
        username,
        password,
        email,
      },
    }
  );
});
