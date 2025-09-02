import { test, expect } from "@playwright/test";

test("Assert Response Status 200 and OK", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/train"
  );
  expect(response.status(), "GET Train Response Status is 200").toBe(200);
  expect(response.statusText(), "GET Train Response Status Text is 'OK'").toBe(
    "OK"
  );
});

test("Assert Response Header: content-type", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/train"
  );
  const headers = response.headers();
  const contentType = headers["content-type"]; // ? response.headers je pole typ map, proto k němu přistupujeme přes hranaté závorky. https://www.w3schools.com/js/js_maps.asp
  expect(contentType, "Header content-type have value").toBe(
    "application/json; charset=utf-8"
  );
  expect(contentType, "Header content-type contain value").toContain(
    "application/json;"
  );
});

test("Response Body Asserts", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/train"
  );
  const responseBody = await response.json(); // ! Pozor, musíme použít await

  // * Kontrola existence properties
  expect(responseBody, "body.timestamp exist").toHaveProperty("timestamp");

  // * Kontrola datových typů properties
  expect(typeof responseBody.id, "body.id is a Number").toBe("number");

  // * Kontroly konkrétních hodnot
  expect(responseBody.message, "body.message have Value").toBe(
    "TEG#B Training GET request successful"
  );
  expect(responseBody.message, "body.message contain Value").toContain("TEG#B");
});
