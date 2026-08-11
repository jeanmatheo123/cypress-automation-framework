# Cypress Automation Framework

![Cypress Tests](https://github.com/jeanmatheo123/cypress-automation-framework/actions/workflows/ci.yml/badge.svg)

End-to-end and API test suite for [automationexercise.com](https://automationexercise.com), built with Cypress and TypeScript. This is a portfolio project — the target site is a public sandbox built specifically for automation practice, not a real company's product.

## What's covered

**UI (`cypress/e2e/ui`)**
- Full account lifecycle: sign up, verify the account was created, log back in, delete it (and clean up after the negative-path test too, since the site rejects duplicate emails)
- Login validation (unregistered email, client-side required-field validation)
- Product search and asserting that every result actually matches the search term
- Adding a product to the cart from both the listing page and the product detail page, including a custom quantity
- Removing an item from the cart
- A full logged-in checkout flow, from cart to order confirmation

**API (`cypress/e2e/api`)**
- `productsList` / `brandsList` — response shape and required fields
- `searchProduct` — happy path and the 400 the API returns when the search term is missing
- `verifyLogin` / `createAccount` / `deleteAccount` — including a test that creates an account purely through the API, confirms login, and deletes it again

Every test that creates data on the site cleans it up in the same run — there's no reason to leave orphaned accounts behind just because the target is a demo site.

## Structure

```
cypress/
  e2e/
    ui/        UI specs
    api/       API specs (cy.request against automationexercise's REST endpoints)
  pages/       Page objects — one class per page, chainable methods
  support/     Custom commands (registerNewUser, deleteCurrentAccount) + a small user-data generator
  fixtures/
```

The page objects don't try to be a generic abstraction over "any e-commerce site" — they're written directly against this site's actual markup (`data-qa` attributes where the site provides them, otherwise the most stable selector available).

## Running it

```bash
npm install
npm run cy:open     # interactive runner
npm run cy:run       # headless, full suite
npm run cy:run:ui    # UI specs only
npm run cy:run:api   # API specs only
```

No environment variables or secrets are required — everything runs against the public site.

## CI

GitHub Actions runs the full suite on every push to `main`, on pull requests, and once a week on a schedule (so a real change on the target site's side gets caught even without a code change here). Failure screenshots are uploaded as a build artifact.

## Notes on design decisions

- `retries.runMode` is set to 2 in `cypress.config.ts`. This is testing a live third-party site with ads and analytics scripts outside my control, so a small retry budget cuts down on noise from that without hiding a real regression (a genuine bug will still fail all 3 attempts).
- `Cypress.on('uncaught:exception', () => false)` in `support/e2e.ts` suppresses errors thrown by the site's own ad/analytics scripts — it does not swallow assertion failures, which are a separate mechanism in Cypress.
- Test data is generated per run (`support/utils.ts`) rather than hard-coded, since the site's signup endpoint rejects a duplicate email.
