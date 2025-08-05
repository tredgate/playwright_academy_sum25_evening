import { test } from "@playwright/test";
import { fakerCS_CZ as faker } from "@faker-js/faker";

test("Testing Data Generation with Faker", async ({ page }) => {
  //test code
  await page.goto("https://tredgate.com/pmtool/");

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email();
  const password = faker.internet.password({ length: 20 });
  const address = faker.location.streetAddress();
  const unlikableInsect = faker.animal.insect();

  console.log(`First name: ${firstName}`);
  console.log(`Last name: ${lastName}`);
  console.log(`Email address: ${email}`);
  console.log(`Password: ${password}`);
  console.log(`Street address: ${address}`);
  console.log(`Unlikable insect: ${unlikableInsect}`);
});
