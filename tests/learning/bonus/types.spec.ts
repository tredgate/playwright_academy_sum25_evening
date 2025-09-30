import { test } from "@playwright/test";

export type UserData = {
  username: string;
  email: string;
  accountBalance: number;
  firstName: string;
  lastName: string;
  role: UserRole;
};

export type UserRole = "admin" | "manager" | "user";

test("Using custom types", async () => {
  const commonUser: UserData = {
    username: "petrsvetr1",
    email: "petr@petr.cz",
    accountBalance: 1,
    firstName: "Petr",
    lastName: "Svetr",
    role: "manager",
  };

  processTypeData(commonUser);
  logRole("manager");
});

function processTypeData(data: UserData) {
  console.log(data.username);
  console.log(data.email);
  console.log(data.lastName);
}

function logRole(role: UserRole) {
  console.log("Role: " + role);
}
