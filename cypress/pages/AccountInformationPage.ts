import { NewUser } from "../support/utils";

class AccountInformationPage {
  assertAccountInfoVisible() {
    cy.contains("h2", "Enter Account Information").should("be.visible");
    return this;
  }

  fillAccountDetails(user: NewUser) {
    cy.get("#id_gender1").check({ force: true });
    cy.get("#password").type(user.password);
    cy.get("#days").select("10");
    cy.get("#months").select("5");
    cy.get("#years").select("1995");
    cy.get("#first_name").type(user.name.split(" ")[0]);
    cy.get("#last_name").type(user.name.split(" ").slice(1).join(" ") || "Tester");
    cy.get("#address1").type("123 Automation Street");
    cy.get("#country").select("United States");
    cy.get("#state").type("California");
    cy.get("#city").type("San Francisco");
    cy.get("#zipcode").type("94016");
    cy.get("#mobile_number").type("5551234567");
    return this;
  }

  submit() {
    cy.get("[data-qa='create-account']").click();
    return this;
  }

  assertAccountCreated() {
    cy.get("[data-qa='account-created']").should("be.visible");
    return this;
  }

  continue() {
    cy.get("[data-qa='continue-button']").click();
    return this;
  }

  assertAccountDeleted() {
    cy.get("[data-qa='account-deleted']").should("be.visible");
    return this;
  }
}

export default new AccountInformationPage();
