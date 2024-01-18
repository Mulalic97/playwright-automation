import { test } from "../utils/test";
import { expect } from "@playwright/test";
import { registerDataAPI } from "../utils/data";

let token;

test.beforeAll(async ({ request, constants }) => {
  const response = await request.post(`${constants.webClientURL}/users`, {
    data: {
      firstName: registerDataAPI.name,
      email: registerDataAPI.email,
      password: registerDataAPI.password,
      lastName: registerDataAPI.lastName,
    },

  });

  expect(response.status()).toBe(201);
  const res = await response.json();
  token = res.token;
});

test("GET users", async ({ constants, request }) => {
  const response = await request.get(`${constants.webClientURL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  expect(response.status()).toBe(200);
});

test("POST contacts", async ({ constants, request }) => {
  const response = await request.post(`${constants.webClientURL}/contacts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      firstName: "John",
      lastName: "Doe",
      birthdate: "1970-01-01",
      email: "jdoe@fake.com",
      phone: "8005555555",
      street1: "1 Main St.",
      street2: "Apartment A",
      city: "Anytown",
      stateProvince: "KS",
      postalCode: "12345",
      country: "USA",
    },
  });

  expect(response.status()).toBe(201);
});
