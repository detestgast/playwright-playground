---
name: generate-playwright-tests-from-ui
agent: agent
tools:
  - playwright/*
---

# MANDATORY WORKFLOW

You must follow these steps and do NOT skip them:

1. Open the application and explore the UI using Playwright MCP tools
2. Interact with key elements (click, type, navigate)
3. Identify user flows, risks, and edge cases
4. Create a test plan
5. Only then generate Playwright tests based on real observations

# IMPORTANT

- Actively use Playwright MCP tools (navigation, clicks, typing)
- Do NOT make assumptions about selectors
- If you do not have access to the UI: stop and ask for input
- Do not navigate or interact outside of the scope of the described test
- Use project instructions and applicable \*.instructions.md files.

# OUTPUT

1. Observations
2. Test plan
3. Test code
4. Assumptions
