class CheckoutPage {
  assertAddressDetailsVisible() {
    cy.get("#address_delivery").should("be.visible");
    return this;
  }

  addOrderComment(comment: string) {
    cy.get("textarea[name='message']").type(comment);
    return this;
  }

  placeOrder() {
    cy.contains("Place Order").click();
    return this;
  }

  payWithDummyCard() {
    cy.get("[data-qa='name-on-card']").type("QA Tester");
    cy.get("[data-qa='card-number']").type("4111111111111111");
    cy.get("[data-qa='cvc']").type("123");
    cy.get("[data-qa='expiry-month']").type("05");
    cy.get("[data-qa='expiry-year']").type("2030");
    cy.get("[data-qa='pay-button']").click();
    return this;
  }

  assertOrderConfirmed() {
    cy.contains("Congratulations! Your order has been confirmed!").should("be.visible");
    return this;
  }
}

export default new CheckoutPage();
