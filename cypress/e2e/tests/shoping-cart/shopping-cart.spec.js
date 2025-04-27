import ProductDetailsPage from "../../../pages/products/product-details-page";
import ShoppingCartPage from "../../../pages/shoping-cart/shopping-cart-page";
import SingleProductDetailsPage from "../../../pages/products/single-product-details-page";

describe("Shopping Cart", () => {
  const productDetailsPage = new ProductDetailsPage();
  const shoppingCartPage = new ShoppingCartPage();
  const singleProductDetailsPage = new SingleProductDetailsPage();

  const email = "mary.jane@gmail.com";
  const password = "User123@+";
  const fullName = "Mary Jane";

  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    cy.login(email, password, fullName);
  });

  it("Should add a product to the cart", () => {
    productDetailsPage.visit();
    productDetailsPage.getPageTitle().should("contain", "Jackets");
    productDetailsPage.getProductItem().first().trigger("mouseover");
    productDetailsPage
      .getProductTitle()
      .should("contain", "Olivia 1/4 Zip Light Jacket");
    productDetailsPage
      .getProductSize()
      .trigger("mouseover")
      .click()
      .should("have.attr", "aria-checked", "true");
    productDetailsPage
      .getProductColor()
      .click()
      .should("have.attr", "aria-checked", "true");

    productDetailsPage.getAddToCartButton().click({ force: true });
    shoppingCartPage.getCartItemCount().should("have.text", "1");

    cy.clearCart();
    cy.logout();
  });

  it.only("should update the total price successfully", () => {
    const quantity = 2;

    cy.addProductToCart();
    shoppingCartPage.visitCartPage();
    shoppingCartPage.getPageTitle().should("contain", "Shopping Cart");
    shoppingCartPage.getCartItemQuantityInput().clear().type("2");
    shoppingCartPage.getUpdateShoppingCartButton().click();

    shoppingCartPage
      .getSingleProductPrice()
      .invoke("text")
      .then((priceText) => {
        const singlePrice = parseFloat(priceText.replace("$", ""));

        const expectedSubtotal = singlePrice * quantity;

        shoppingCartPage
          .getCartSubtotal()
          .invoke("text")
          .then((subtotalText) => {
            const actualSubtotal = parseFloat(subtotalText.replace("$", ""));

            expect(actualSubtotal).to.eq(expectedSubtotal);
          });
      });
  });
});
