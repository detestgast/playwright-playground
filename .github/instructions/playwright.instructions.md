---
applyTo: 'tests/e2e/**/*.spec.ts'
description: 'Rules for Playwright end-to-end tests'
---

# Playwright test generation rules

## Role

Act as an experienced Playwright test automation engineer.

## Structure

- Use test.describe to group related scenarios.
- Use clear test names that describe user behavior.
- Keep setup minimal; move repetition to fixtures or helpers.

## Selectors

- Prioritize Playwright's built-in locators; these locators come with auto-waiting and retry-ability.
- Prioritize getByRole, getByLabel, and getByPlaceholder.
- Do not use nth-child selectors or brittle CSS selectors unless explicitly required.
- Explain why you choose a lesser locator if semantic locators are missing.

## Assertions

- Use web first assertions from https://playwright.dev/docs/test-assertions that support auto-waiting and retries.
- Assert on visible behavior and relevant state.
- Use Soft assertions for non-critical checks (like content), but ensure critical assertions (like navigation) are hard.

## Stability

- No waitForTimeout unless explicitly requested.
- Use navigation/assertion-based synchronization wherever possible.
- Identify potential flakiness and propose a solution to mitigate it.

## Coverage

- Create at least:
- one happy path
- one validation error or edge case
- one regression risk if applicable

## Output

- First, provide a test plan in bullet points.
- Then, generate the test code.
- Add "Risks / assumptions" at the bottom.
