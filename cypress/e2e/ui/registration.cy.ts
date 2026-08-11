import HomePage from "../../pages/HomePage";
import SignupLoginPage from "../../pages/SignupLoginPage";
import { generateUser } from "../../support/utils";

describe("Account registration and deletion", () => {
  it("registers a new account, verifies it, and deletes it", () => {
    const user = generateUser();

    cy.registerNewUser(user);

    HomePage.assertLoggedInAs(user.name);

    cy.deleteCurrentAccount();
  });

  it("rejects signup with an email that is already registered", () => {
    const user = generateUser();

    cy.registerNewUser(user);
    HomePage.logout();

    HomePage.visit().goToSignupLogin();
    SignupLoginPage.assertNewUserSignupVisible().signup(user.name, user.email);
    SignupLoginPage.assertSignupErrorVisible("Email Address already exist!");

    // clean up: log back in with the account we created above and remove it
    SignupLoginPage.login(user.email, user.password);
    cy.deleteCurrentAccount();
  });
});
