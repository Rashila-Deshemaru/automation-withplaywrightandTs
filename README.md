# Playwright + Cucumber Automation Framework

## Overview
This project is an end-to-end test automation framework built using:
- Playwright
- Cucumber (BDD)
- TypeScript

It automates critical user flows such as login and hairdresser review submission.

## Tech Stack
- Playwright
- Cucumber
- TypeScript
- Node.js
- log4js

## Project Structure
- tests/features – Gherkin feature files
- tests/steps – Step definitions
- tests/pages – Page Object Model
- tests/support – Hooks, world, config
- reports – Logs and test outputs

## How to Run Tests
```bash
npm install
npx cucumber-js
