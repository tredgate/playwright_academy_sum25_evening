import { test, expect } from "@playwright/test";

test("Exercise: Assert API Response", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/4"
  );
  const responseBody = await response.json();
  expect(responseBody, "body.userId exist").toHaveProperty("userId");
  expect(typeof responseBody.active, "body.active is a Number").toBe("number");
  expect(responseBody.username).toBe("petrfifka");
});
