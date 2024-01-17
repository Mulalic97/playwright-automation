import { RegisterPage } from "../pages/register.page";
import { test } from "../utils/test";
import { expect } from "@playwright/test";
import {registerData} from "../utils/data";

test.describe("Register", () => {
  test("User successfully registered", async ({ page, constants }) => {
    const registerPage = new RegisterPage(page, constants);

    await registerPage.register(
      registerData.name,
      registerData.email,
      registerData.password,
      registerData.lastName,
    );

    await page.waitForTimeout(3000);
    await expect(page.url()).toBe(`${constants.webClientURL}/contactList`);
  });
});
