class ProductDetailsPage {
  visit() {
    cy.visit(`/women/tops-women/jackets-women.html`);
  }
  getPageTitle() {
    return cy.get("#page-title-heading");
  }

  getPriceFilter() {
    return cy.get("div.filter-options-title").contains("Price");
  }

  getPriceRange() {
    return cy
      .contains("div.filter-options-title", "Price")
      .parent()
      .find("div.filter-options-content ol.items > li")
      .first();
  }

  getProductAmount() {
    return cy.get("ol.items > li.item").first().find("span.price");
  }

  getNumberOfProductItems() {
    return cy.get("ol.products.list.items.product-items");
  }

  getProductItem() {
    cy.get(
      "ol.products.list.items.product-items > li.item.product.product-item"
    );
  }
  getProductPrice() {
    return cy.get("span.price");
  }

  getAddToCartButton() {
    return cy
      .get("li.item.product.product-item")
      .first()
      .within(() => {
        cy.get('button[type="submit"]');
      });
  }
}

export default ProductDetailsPage;
