class UserLoginPage {
  visit() {
    cy.visit(`/customer/account/login/`);
  }
  getLoginPageTitle() {
    return cy.get('[data-ui-id="page-title-wrapper"]');
  }
  getEmailField() {
    return cy.get("#email");
  }
  getPasswordField() {
    return cy.get("#pass");
  }

  getSignInButton() {
    return cy.get("#send2");
  }
}

export default UserLoginPage;
