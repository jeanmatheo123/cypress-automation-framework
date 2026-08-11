class ProductsPage {
  assertAllProductsVisible() {
    cy.contains("h2", "All Products").should("be.visible");
    return this;
  }

  searchProduct(name: string) {
    cy.get("#search_product").clear().type(name);
    cy.get("#submit_search").click();
    return this;
  }

  assertSearchedProductsVisible() {
    cy.contains("h2", "Searched Products").should("be.visible");
    return this;
  }

  getProductCards() {
    return cy.get(".features_items .product-image-wrapper");
  }

  /**
   * The name sits in a <p>, not an <h2> — the <h2> in this markup is the price,
   * and both the visible card and its hover overlay duplicate the same
   * name/price pair in the DOM, so this scopes to just the visible one.
   */
  getProductName(index: number) {
    return this.getProductCards().eq(index).find(".productinfo p").invoke("text").then((text) => text.trim());
  }

  hoverAndAddToCartByIndex(index: number) {
    this.getProductCards()
      .eq(index)
      .within(() => {
        cy.get(".product-overlay .add-to-cart").click({ force: true });
      });
    return this;
  }

  continueShopping() {
    cy.get(".modal-content").contains("Continue Shopping").click();
    return this;
  }

  viewCartFromModal() {
    cy.get(".modal-content").contains("View Cart").click();
    return this;
  }

  openProductByIndex(index: number) {
    this.getProductCards().eq(index).find("a").contains("View Product").click({ force: true });
    return this;
  }
}

export default new ProductsPage();
