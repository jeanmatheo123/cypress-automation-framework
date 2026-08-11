import HomePage from "../pages/HomePage";
import SignupLoginPage from "../pages/SignupLoginPage";
import AccountInformationPage from "../pages/AccountInformationPage";
import { NewUser } from "./utils";

declare global {
  namespace Cypress {
    interface Chainable {
      /** Runs the full signup flow (name/email step + account details step) and lands logged in on the home page. */
      registerNewUser(user: NewUser): Chainable<void>;
      /** Deletes the currently logged-in account, asserting the confirmation screen. */
      deleteCurrentAccount(): Chainable<void>;
    }
  }
}

Cypress.Commands.add("registerNewUser", (user: NewUser) => {
  HomePage.visit().goToSignupLogin();
  SignupLoginPage.assertNewUserSignupVisible().signup(user.name, user.email);
  AccountInformationPage.assertAccountInfoVisible()
    .fillAccountDetails(user)
    .submit()
    .assertAccountCreated()
    .continue();
});

Cypress.Commands.add("deleteCurrentAccount", () => {
  HomePage.deleteAccount();
  AccountInformationPage.assertAccountDeleted().continue();
});

export {};
