import HomePage from "../../pages/HomePage";
import ProductsPage from "../../pages/ProductsPage";
import ProductDetailPage from "../../pages/ProductDetailPage";
import CartPage from "../../pages/CartPage";

describe("Product browsing and cart", () => {
  beforeEach(() => {
    HomePage.visit().goToProducts();
    ProductsPage.assertAllProductsVisible();
  });

  it("searches for a product and returns a filtered subset of the catalog", () => {
    ProductsPage.getProductCards()
      .its("length")
      .then((totalCount) => {
        ProductsPage.searchProduct("Dress");
        ProductsPage.assertSearchedProductsVisible();

        // the search also matches by category, not just a literal substring of the
        // name (e.g. searching "Dress" also returns "Sleeves Top and Short..." because
        // it's filed under a dress-adjacent category), so the only safe assertion here
        // is that it actually filtered the catalog down, not that every name matches
        ProductsPage.getProductCards().should("have.length.greaterThan", 0).and("have.length.lessThan", totalCount);
      });
  });

  it("adds a product to the cart directly from the listing page", () => {
    ProductsPage.getProductName(0).then((productName) => {
      ProductsPage.hoverAndAddToCartByIndex(0);
      ProductsPage.viewCartFromModal();

      CartPage.assertCartVisible();
      CartPage.assertProductInCart(productName);
    });
  });

  it("adds a product to the cart from its detail page with a custom quantity", () => {
    ProductsPage.getProductName(1).then((productName) => {
      ProductsPage.openProductByIndex(1);
      ProductDetailPage.assertProductNameVisible(productName);
      ProductDetailPage.setQuantity(3);
      ProductDetailPage.addToCart();
      ProductDetailPage.viewCartFromModal();

      CartPage.assertCartVisible();
      CartPage.assertQuantityForRow(0, 3);
    });
  });
});
