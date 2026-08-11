import { generateUser } from "../../support/utils";
import { apiRequest } from "../../support/api";

describe("Account & auth API", () => {
  it("POST /api/verifyLogin returns 404 for credentials that don't exist", () => {
    apiRequest({
      method: "POST",
      url: "/api/verifyLogin",
      body: { email: "nobody.qaframework@example.com", password: "wrong-password" },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.body.responseCode).to.eq(404);
      expect(response.body.message).to.eq("User not found!");
    });
  });

  it("POST /api/verifyLogin without a password returns a 400", () => {
    apiRequest({
      method: "POST",
      url: "/api/verifyLogin",
      body: { email: "someone@example.com" },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.body.responseCode).to.eq(400);
    });
  });

  it("GET /api/verifyLogin rejects the wrong HTTP method", () => {
    apiRequest({ method: "GET", url: "/api/verifyLogin", failOnStatusCode: false }).then((response) => {
      expect(response.body.responseCode).to.eq(405);
    });
  });

  it("creates an account through the API and confirms it can log in", () => {
    // isolate this test from the failed-login attempts above: automationexercise.com
    // appears to rate-limit/flag verifyLogin for a session that just had bad-credential
    // attempts, which made this test flaky when it ran later in the same session
    cy.clearCookies();

    const user = generateUser();

    apiRequest({
      method: "POST",
      url: "/api/createAccount",
      body: {
        name: user.name,
        email: user.email,
        password: user.password,
        title: "Mr",
        birth_date: "10",
        birth_month: "5",
        birth_year: "1995",
        firstname: user.name,
        lastname: "Tester",
        company: "QA Framework",
        address1: "123 Automation Street",
        address2: "",
        country: "United States",
        zipcode: "94016",
        state: "California",
        city: "San Francisco",
        mobile_number: "5551234567",
      },
    })
      .then((createResponse) => {
        expect(createResponse.body.responseCode).to.eq(201);

        return apiRequest({
          method: "POST",
          url: "/api/verifyLogin",
          body: { email: user.email, password: user.password },
        });
      })
      .then((loginResponse) => {
        expect(loginResponse.body.responseCode).to.eq(200);
        expect(loginResponse.body.message).to.eq("User exists!");

        // clean up the account created for this test
        return apiRequest({
          method: "DELETE",
          url: "/api/deleteAccount",
          body: { email: user.email, password: user.password },
        });
      })
      .then((deleteResponse) => {
        expect(deleteResponse.body.responseCode).to.eq(200);
      });
  });
});
