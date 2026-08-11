class ProductDetailPage {
  assertProductNameVisible(name: string) {
    cy.get(".product-information h2").should("contain.text", name);
    return this;
  }

  setQuantity(quantity: number) {
    cy.get("#quantity").clear().type(quantity.toString());
    return this;
  }

  addToCart() {
    cy.get("button").contains("Add to cart").click();
    return this;
  }

  viewCartFromModal() {
    cy.get(".modal-content").contains("View Cart").click();
    return this;
  }
}

export default new ProductDetailPage();
