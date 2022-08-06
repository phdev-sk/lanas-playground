describe("login flow", () => {
  it("should login", () => {
    cy.visit("http://localhost:5173/#/login");

    cy.get("input[id=email]").type("matej.hospodar@bratislava.sk");

    // {enter} causes the form to submit
    cy.get("input[id=password]").type("password{enter}");

    // we should be redirected to /dashboard
    cy.url().should("equal", "http://localhost:5173/#/");

    // our auth cookie should be present
    cy.getCookie("auth-cookie").should("exist");
  });
});
