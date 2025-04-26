import ProductDetailsPage from "../../../pages/products/product-details-page";

describe("Shopping Cart", () => {
  it("Should add a product to the cart", () => {
    const productDetailsPage = new ProductDetailsPage();
    productDetailsPage.visit();
    productDetailsPage.getPageTitle().should("contain", "Jackets");
    productDetailsPage.getProductItem().first().trigger("mouseover");
    productDetailsPage.getAddToCartButton().click();
  });
});
