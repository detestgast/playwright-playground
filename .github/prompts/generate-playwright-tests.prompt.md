---
name: generate-playwright-tests
description: Generate Playwright tests for a user flow or component
argument-hint: Describe the flow, page, or file for which tests should be created
agent: agent
---

# Task

Generate Playwright end-to-end tests based on the provided context.

## Workflow

1. First, analyze the flow, risks, and primary user intents.
2. Next, provide a brief test plan with scenarios.
3. Then, generate the Playwright test code.
4. Conclude with:
   - Assumptions
   - Potential flakiness risks
   - Suggestions for more stable selectors or test data

## Important rules

- Use project instructions and applicable \*.instructions.md files.

## Input

Use the currently open file, selected code, or user input as the primary context.
If context is missing, specify what additional information is needed, but provide a best-effort proposal upfront.
