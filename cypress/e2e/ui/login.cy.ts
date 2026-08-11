import HomePage from "../../pages/HomePage";
import SignupLoginPage from "../../pages/SignupLoginPage";

describe("Login validation", () => {
  beforeEach(() => {
    HomePage.visit().goToSignupLogin();
    SignupLoginPage.assertLoginVisible();
  });

  it("rejects a login with an email that was never registered", () => {
    SignupLoginPage.login("no.such.user.qaframework@example.com", "whatever-it-is");
    SignupLoginPage.assertLoginErrorVisible("Your email or password is incorrect!");
  });

  it("rejects a login with an empty password", () => {
    cy.get("[data-qa='login-email']").type("someone@example.com");
    cy.get("[data-qa='login-button']").click();

    // the browser's native "required" validation blocks submission client-side
    cy.get("[data-qa='login-password']:invalid").should("exist");
  });
});
