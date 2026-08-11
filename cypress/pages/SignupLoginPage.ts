class SignupLoginPage {
  assertNewUserSignupVisible() {
    cy.contains("h2", "New User Signup!").should("be.visible");
    return this;
  }

  assertLoginVisible() {
    cy.contains("h2", "Login to your account").should("be.visible");
    return this;
  }

  signup(name: string, email: string) {
    cy.get("[data-qa='signup-name']").type(name);
    cy.get("[data-qa='signup-email']").type(email);
    cy.get("[data-qa='signup-button']").click();
    return this;
  }

  login(email: string, password: string) {
    cy.get("[data-qa='login-email']").clear().type(email);
    cy.get("[data-qa='login-password']").clear().type(password);
    cy.get("[data-qa='login-button']").click();
    return this;
  }

  assertSignupErrorVisible(message: string) {
    cy.get("form[action='/signup']").contains("p", message).should("be.visible");
    return this;
  }

  assertLoginErrorVisible(message: string) {
    cy.get("form[action='/login']").contains("p", message).should("be.visible");
    return this;
  }
}

export default new SignupLoginPage();
