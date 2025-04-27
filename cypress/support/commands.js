// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import UserLoginPage from "../pages/user-registration/user-login-page";
import UserAccountPage from "../pages/user-registration/user-account-page";
import ProductDetailsPage from "../pages/products/product-details-page";
import ShoppingCartPage from "../pages/shoping-cart/shopping-cart-page";

const userLoginPage = new UserLoginPage();
const userAccountPage = new UserAccountPage();
const productDetailsPage = new ProductDetailsPage();
const shoppingCartPage = new ShoppingCartPage();

Cypress.Commands.add("login", (email, password, fullName) => {
  userLoginPage.visit();
  cy.url().should("include", "/customer/account/login/");

  userLoginPage.getEmailField().type(email);
  userLoginPage.getPasswordField().type(password);
  cy.intercept("GET", "/customer/account").as("getAccount");
  userLoginPage.getSignInButton().click();

  cy.wait("@getAccount");

  cy.url().should("include", "/customer/account/");
  userAccountPage
    .getWelcomeMessage()
    .should("contain", `Welcome, ${fullName}!`);
});

Cypress.Commands.add("addProductToCart", () => {
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
});

Cypress.Commands.add("clearCart", () => {
  shoppingCartPage.visitCartPage();
  shoppingCartPage.getPageTitle().should("contain", "Shopping Cart");
  shoppingCartPage.getDeleteIcon().click({ force: true }, { timeout: 30000 });
  shoppingCartPage
    .getEmptyCartMessage()
    .should("contain", "You have no items in your shopping cart.");
});

Cypress.Commands.add("logout", () => {
  userLoginPage
    .getCustomerMenuToggle()
    .filter(":visible")
    .click({ force: true });
  userLoginPage.getSignOutButton().click({ force: true });
  userLoginPage.getSignedOutTitle().should("have.text", "You are signed out");
});

Cypress.Commands.add("selectProduct", () => {
  productDetailsPage.visit();
  productDetailsPage.getPageTitle().should("contain", "Jackets");
  productDetailsPage.getProductItem().first().trigger("mouseover");
  productDetailsPage
    .getProductTitle()
    .should("contain", "Olivia 1/4 Zip Light Jacket");
  productDetailsPage.getProductItem().first().click();
  cy.url().should("include", "/olivia-1-4-zip-light-jacket");
});
