import "./commands";

// automationexercise.com occasionally serves a third-party ad script that throws
// unrelated to our app under test; failing tests on that noise isn't useful.
Cypress.on("uncaught:exception", () => false);
