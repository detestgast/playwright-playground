# Copilot Instructions

## Goal

The purpose of this repository is to have AI assist in generating, extending, and refactoring tests, with a focus on accessibility, reliability, readability, and maintainability.

## Generic principles

- Automated tests should verify that the application code works for the end users, and avoid relying on implementation details.
- Each test should be completely isolated from another test and should run independently with its own local storage, session storage, data, cookies etc.
- Don't try to test links to external sites or third party servers.
- Prioritize accessible selectors over fragile ones like data-testid or CSS selectors.
- Prioritize stable selectors such as role, label, or semantic locators.
- Do not use hardcoded waits or sleeps if an explicit wait or assertion is possible.
- Each test must have one clear goal.
- Keep tests small and diagnostic: in case of failure, it must quickly become clear what is broken.

## Expectations for test generation

- First, analyze which risks or user flows are relevant.
- Do not generate only “happy path” tests, but also at least relevant edge cases.
- Add short comments if the intent of a step is otherwise unclear.
- Use consistent test names that start with the expected behavior.
- Avoid duplication by using helper functions or fixtures for recurring setup.

## Quality requirements

- Always specify what assumptions you are making.
- If context is missing, explicitly formulate the missing assumptions.
- If a test is likely to be flaky, identify it and provide a more stable alternative.
- If a test becomes difficult to maintain, propose a simpler approach.

## Output style

- First, provide a brief test plan.
- Then, deliver the test code.
- Conclude with a short section "Assumptions and open items".
