# portfolio-flow-test

## Note before running
This test can fail on first run if the account shows a device approval checkpoint after sign-in.

This checkpoint needs a manual email approval.
Due to time constraints, I was not able to automate this in this solution.

## What this test does
- Opens the sign-in page from config
- Signs in with credentials from local YAML config
- Checks that portfolio value is visible on the home screen
- Asserts the displayed value matches the expected value from config

## Stack
- TypeScript
- Playwright
- YAML config loader

## Prerequisites
- Node.js 18+

## Approach
I manually tested the full flow first so I could understand each step before automating it.

After that I set up Page Object Model classes to keep selectors and actions separate from the test logic.
I then gathered selectors for sign-in and portfolio value and wired them into a single end-to-end test.

At the final stage I ran into a manual email approval checkpoint that must be completed in the same session.
Due to time, I was not able to get around this.

## Setup
1. Clone the repository:
   - `git clone <repo-url>`
2. Move into the project folder:
   - `cd portfolio-flow-test`
3. Install dependencies:
   - `npm install`
4. Install browser binaries:
   - `npx playwright install`
5. Create local config:
   - `cp config/env.example.yaml config/env.local.yaml`
6. Update `config/env.local.yaml` with your own values.

## Config file
Use `config/env.local.yaml` for real values. This file is ignored by git.

Example:

```yaml
baseUrl: "https://example.com/sign-in"
username: "your-email@example.com"
password: "your-password"
expectedPortfolioValue: 0.00
currencySymbol: "£"
```

## Run
Run headed (recommended while validating login):
- `npx playwright test tests/signIn.spec.ts --project=chromium --headed`

Run headless:
- `npx playwright test tests/signIn.spec.ts --project=chromium`

## Linux/headless note
For Linux runners, make sure browser dependencies are available. A common setup is:
- `npx playwright install --with-deps`

