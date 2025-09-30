import { test } from "@playwright/test";
import { UserApi } from "../../../src/api/tegb/user_api.ts";

test("Object Literal Test", async () => {
  const userData = {
    username: "user123",
    email: "petr.fifka@tredgate.cz",
    accountBalance: 15000,
    firstName: "Petr",
    lastName: "Fifka",
  };

  console.log("Username: " + userData.username);
  console.log("Email: " + userData.email);

  processUserData(userData);

  // Využití statické metody
  const generatedData = UserApi.generateUser();
  console.log(generatedData);
});

function processUserData(userData: {
  username: string;
  email: string;
  accountBalance: number;
  firstName: string;
  lastName: string;
}) {
  console.log(userData.username);
  console.log(userData.firstName);
  console.log(userData.lastName);
}
