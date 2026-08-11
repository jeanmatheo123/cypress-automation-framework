class CartPage {
  assertCartVisible() {
    cy.get("#cart_info").should("be.visible");
    return this;
  }

  getRows() {
    return cy.get("#cart_info tbody tr");
  }

  assertProductInCart(name: string) {
    this.getRows().should("contain.text", name);
    return this;
  }

  assertQuantityForRow(rowIndex: number, quantity: number) {
    this.getRows().eq(rowIndex).find(".cart_quantity button").should("contain.text", quantity.toString());
    return this;
  }

  removeProductByRow(rowIndex: number) {
    this.getRows().eq(rowIndex).find(".cart_quantity_delete").click();
    return this;
  }

  proceedToCheckout() {
    cy.contains("Proceed To Checkout").click();
    return this;
  }
}

export default new CartPage();
