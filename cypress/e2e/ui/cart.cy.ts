import HomePage from "../../pages/HomePage";
import ProductsPage from "../../pages/ProductsPage";
import CartPage from "../../pages/CartPage";

describe("Cart management", () => {
  beforeEach(() => {
    HomePage.visit().goToProducts();
    ProductsPage.assertAllProductsVisible();
    ProductsPage.hoverAndAddToCartByIndex(0);
    ProductsPage.continueShopping();
    ProductsPage.hoverAndAddToCartByIndex(1);
    ProductsPage.viewCartFromModal();
    CartPage.assertCartVisible();
  });

  it("lists every product that was added, in order", () => {
    CartPage.getRows().should("have.length", 2);
  });

  it("removes a product from the cart", () => {
    CartPage.removeProductByRow(0);
    CartPage.getRows().should("have.length", 1);
  });
});
