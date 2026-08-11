class HomePage {
  visit() {
    cy.visit("/");
    return this;
  }

  goToSignupLogin() {
    cy.get("a[href='/login']").first().click();
    return this;
  }

  goToProducts() {
    cy.get("a[href='/products']").first().click();
    return this;
  }

  goToCart() {
    cy.get("a[href='/view_cart']").first().click();
    return this;
  }

  deleteAccount() {
    cy.get("a[href='/delete_account']").click();
    return this;
  }

  logout() {
    cy.get("a[href='/logout']").click();
    return this;
  }

  assertLoggedInAs(username: string) {
    cy.contains("li", "Logged in as").should("contain.text", username);
    return this;
  }

  assertHomePageVisible() {
    cy.get(".features_items").should("be.visible");
    return this;
  }
}

export default new HomePage();
