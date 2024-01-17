import { Locator, Page } from "@playwright/test";
import { Constants } from "../utils/test";

export class RegisterPage {
  private readonly page: Page;
  private readonly constants;

  // Element Locators
  readonly nameInputField: Locator;
  readonly lastNameInputField: Locator;
  readonly passwordInputField: Locator;
  readonly emailInputField: Locator;
  readonly submitButton: Locator;

  constructor(page: Page, constants: Constants) {
    this.page = page;
    this.constants = constants;

    this.nameInputField = page.locator("#firstName");
    this.lastNameInputField = page.locator("#lastName");
    this.emailInputField = page.locator("#email");
    this.passwordInputField = page.locator("#password");
    this.submitButton = page.getByRole("button", { name: "Submit" });
  }

  async goto() {
    await this.page.goto(`${this.constants.webClientURL}/addUser`);
  }

  async inputName(name: string) {
    await this.nameInputField.fill(name);
  }

  async inputLastName(lastName: string) {
    await this.lastNameInputField.fill(lastName);
  }

  async inputEmail(email: string) {
    await this.emailInputField.fill(email);
  }

  async inputPassword(password: string) {
    await this.passwordInputField.fill(password);
  }

  async clickSubmitButton() {
    await this.submitButton.click();
  }

  async register(
    name: string,
    email: string,
    password: string,
    lastName: string,
  ) {
    await this.goto();
    await this.inputName(name);
    await this.inputLastName(lastName);
    await this.inputEmail(email);
    await this.inputPassword(password);
    await this.clickSubmitButton();
  }
}
