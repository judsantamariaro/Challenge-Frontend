/* global describe, it, cy */

describe("Flujo básico de búsqueda y detalle", () => {
  it("Busca un producto y navega al detalle", () => {
    cy.visit("/");

    // Escribe en el input de búsqueda y envía el formulario
    cy.get('input[aria-label="Buscar producto"]').type("iPhone{enter}");

    // Espera a que aparezcan los resultados
    cy.contains("iPhone 13 128GB").should("be.visible");
    cy.contains("ARS 800,000").should("be.visible");

    // Haz clic en el resultado para ir al detalle
    cy.contains("iPhone 13 128GB").click();

    // Verifica que se muestre el detalle del producto
    cy.contains("Descripción del producto").should("be.visible");
    cy.contains(
      "El nuevo iPhone 13 con increíble rendimiento y cámara."
    ).should("be.visible");
    cy.contains("Envió Gratis").should("be.visible");
  });
});
