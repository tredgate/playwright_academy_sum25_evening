// user_api.ts
// src/api/tegb

import { APIRequestContext } from "@playwright/test";
import { fakerCS_CZ as faker } from "@faker-js/faker";
import { UserData } from "../../../tests/learning/bonus/types.spec.ts";

export class UserApi {
  readonly request: APIRequestContext;
  readonly apiUrl = "http://localhost:3000";

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async registerUser(username: string, password: string, email: string) {
    const response = this.request.post(`${this.apiUrl}/user/register`, {
      data: {
        username,
        email,
        password,
      },
    });
    return response;
  }

  static generateUser(): UserData {
    return {
      username: faker.internet.username(),
      email: faker.internet.exampleEmail(),
      firstName: faker.person.firstName(),
      accountBalance: faker.number.int({ min: 0, max: 250_000 }),
      lastName: faker.person.lastName(),
      role: "manager",
    };
  }

  async loginUser(username: string, password: string) {
    const response = this.request.post(`${this.apiUrl}/auth/login`, {
      data: {
        username,
        password,
      },
    });
    return response;
  }
}
