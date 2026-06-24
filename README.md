# Playwright Test Automation Playground

A test automation project built with [Playwright](https://playwright.dev/) and TypeScript, targeting the DELA funeral insurance application. It demonstrates a maintainable, accessible, and strongly-typed approach to both end-to-end and API testing.

---

## Technology Stack

| Tool                                          | Purpose                                                          |
| --------------------------------------------- | ---------------------------------------------------------------- |
| [Playwright](https://playwright.dev/)         | Browser automation and test runner                               |
| [TypeScript](https://www.typescriptlang.org/) | Static typing across all test and support code                   |
| [Allure](https://allurereport.org/)           | Rich test reporting with step-level detail and trace attachments |
| [Prettier](https://prettier.io/)              | Consistent code formatting                                       |

---

## Design Choices

### Page Object Model

All page interactions are encapsulated in page classes that extend a shared `BasePage`. This keeps test files focused on _what_ is being tested, not _how_ the UI is operated. Locators are defined as class fields — declared and initialised in one place — and shared methods handle repeated interactions.

### Accessible Locators

Locators exclusively use Playwright's `getByRole` API. This means tests interact with the page the same way an assistive technology user would — by role and accessible name — rather than relying on fragile CSS selectors, XPath, or `data-testid` attributes.

### ARIA Snapshots

For key UI states, ARIA snapshots capture the full accessible tree of a region. These serve as regression guards: any structural or semantic change to the page is surfaced immediately, without needing fine-grained per-element assertions.

### Custom Fixtures

Page objects are provided to tests via Playwright's fixture system. Each test receives a fully initialised page object without any setup boilerplate in the test itself. Fixtures also attach Playwright traces to Allure reports automatically after each test.

### Strong TypeScript Typing

Domain concepts — insurance types, durations, payment frequencies, person data — are expressed as `as const` objects and TypeScript types. This means tests and page methods receive typed values, IDE autocompletion is accurate, and adding or removing a domain value produces a compile-time error everywhere it needs handling.

### Data-Driven Tests

Test scenarios are defined as typed data objects and iterated over in `test.describe` loops. Adding a new scenario requires no changes to test logic — only a new data entry.

### API Testing

Alongside E2E tests, the project includes API-level premium calculation tests. Because the target API sits behind Cloudflare Bot Management, requests are made via `page.evaluate` using the browser's native `fetch`, so Chrome's TLS fingerprint passes validation. This demonstrates a practical pattern for testing APIs that are not accessible from a plain HTTP client.

### Reporting

Allure is integrated as a reporter. Tests are structured with named `allure.step` calls that map to user-facing actions, making reports readable by non-technical stakeholders. Playwright traces are attached to each test result for post-mortem debugging.

## Project Structure

```
├── playwright.config.ts # Playwright configuration (baseURL, reporters, projects)
├── tests/
│  ├── scenarios/ # Typed test data (persons, insurance options, addresses)
│  ├── insurance-premium-calculation-e2e.spec.ts # Full E2E flow tests
│  └── insurance-premium-calculation-api.spec.ts # API-level premium calculation tests
└── src/
  ├── consts/ # Domain constants (insurance types, durations, payment frequencies)
  ├── fixtures/ # Custom Playwright fixtures (page object injection, trace attachment)
  ├── pages/ # Page Object classes
  │  ├── base-page.ts # Shared locators and helpers (navigation, cookie banner)
  │  └── uitvaartverzekering-afsluiten-page.ts
  ├── types/ # TypeScript types (Person, InsuranceOptions, Gender, etc.)
  └── utils/ # Utility functions (date formatting, API field mapping, network helpers)
```

## Scripts

```bash
npm run pw              # Run all tests
npm run pwui            # Open Playwright UI mode
npm run pwdebug         # Run tests in debug mode
npm run pw-allure       # Run tests and open Allure report
npm run format          # Format all files with Prettier
```
