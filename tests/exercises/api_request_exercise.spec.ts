import { test } from "@playwright/test";

test("Exercise: Calling Simple API", async ({ request }) => {
  await request.get("https://www.tredgate.cloud/courses");
});
