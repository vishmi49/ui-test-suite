import Utils from "../../../support/utils";
import UserLoginPage from "../../../pages/user-registration/user-login-page";
import UserAccountPage from "../../../pages/user-registration/user-account-page";

describe("User Login", () => {
  const userLoginPage = new UserLoginPage();
  const userAccountPage = new UserAccountPage();

  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });

  it("Should login with valid credentials", () => {
    const email = "mary.jane@gmail.com";
    const password = "User123@+";
    const fullName = "Mary Jane";

    userLoginPage.visit();
    cy.wait(2000);
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

  it.only("should be able to logout successfully", () => {
    const email = "mary.jane@gmail.com";
    const password = "User123@+";
    const fullName = "Mary Jane";

    cy.login(email, password, fullName);

    userLoginPage
      .getCustomerMenuToggle()
      .filter(":visible")
      .click({ force: true });
    userLoginPage.getSignOutButton().click();
    userLoginPage.getSignedOutTitle().should("have.text", "You are signed out");
  });

  it("Should not login with invalid credentials", () => {
    const email = "mary.jane@gmail.com";
    const password = "User12345";

    userLoginPage.visit();
    cy.url().should("include", "/customer/account/login/");

    userLoginPage.getEmailField().type(email);
    userLoginPage.getPasswordField().type(password);

    userLoginPage.getSignInButton().click();

    cy.get(".message-error > div")
      .invoke("text")
      .then((errorMessage) => {
        cy.log("Error Message:", errorMessage.trim());
        expect(errorMessage.trim()).to.equal(
          "The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later."
        );
      });
  });
});
