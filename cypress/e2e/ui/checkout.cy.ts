import HomePage from "../../pages/HomePage";
import ProductsPage from "../../pages/ProductsPage";
import CartPage from "../../pages/CartPage";
import CheckoutPage from "../../pages/CheckoutPage";
import { generateUser, NewUser } from "../../support/utils";

describe("Checkout flow", () => {
  let user: NewUser;

  before(() => {
    user = generateUser();
    cy.registerNewUser(user);
  });

  after(() => {
    HomePage.visit();
    cy.deleteCurrentAccount();
  });

  it("places an order end-to-end as a logged-in user", () => {
    HomePage.visit().goToProducts();
    ProductsPage.hoverAndAddToCartByIndex(0);
    ProductsPage.viewCartFromModal();

    CartPage.proceedToCheckout();
    CheckoutPage.assertAddressDetailsVisible();
    CheckoutPage.addOrderComment("Please leave the package with the front desk.");
    CheckoutPage.placeOrder();

    CheckoutPage.payWithDummyCard();
    CheckoutPage.assertOrderConfirmed();
  });
});
