import ProductsMenuPage from "../../../pages/products/products-menu-page";
import ProductDetailsPage from "../../../pages/products/product-details-page";
import { should } from "chai";

describe("Product Details Page", () => {
  const productsMenuPage = new ProductsMenuPage();
  const productDetailsPage = new ProductDetailsPage();

  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });

  it("Should navigate to the sub menu pages", () => {
    productsMenuPage.visit();
    cy.url().should("include", "/");
    productsMenuPage.getWomenMenu().trigger("mouseover");
    productsMenuPage.getTopsMenu().trigger("mouseover");
    productsMenuPage.getJacketsMenu().click();

    productDetailsPage.getPageTitle().should("contain", "Jackets");
  });

  it.only("Should filter products by price", () => {
    productDetailsPage.visit();
    productDetailsPage.getPageTitle().should("contain", "Jackets");
    productDetailsPage.getPriceFilter();
    productDetailsPage.getPriceRange().click();
    cy.url().should("include", "price");

    productDetailsPage.getNumberOfProductItems().then(($productItems) => {
      const productCount = $productItems.length;
      cy.log("Product Count:", productCount);
      expect(productCount).to.equal(1);
    });

    productDetailsPage.getProductAmount().then(($priceElement) => {
      const productPrice = $priceElement.text().trim();
      productDetailsPage.getProductPrice().should("contain", productPrice);
    });
  });
});
