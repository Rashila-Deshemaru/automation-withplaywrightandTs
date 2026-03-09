# Playwright + Cucumber Automation Framework

## Overview
This project is an end-to-end test automation framework with Page Object Model built using:
- Playwright
- Cucumber (BDD)
- TypeScript

It automates critical user flows such as login and hairdresser review submission.
It also performs API validation using GraphQL with UI for filter feature in haidresserpage

## Tech Stack
- Playwright
- Cucumber
- TypeScript
- Node.js
- log4js
- GraphQL API validation

## Project Structure
- tests/features – Gherkin feature files
- tests/steps – Step definitions
- tests/pages – Page Object Model
- tests/fixtures - Test Data
- tests/support – Hooks, world, config
- tests/support/api – GraphQL helperfor API validation
- reports – Logs and test outputs


## Setup

### 1. Clone the repository
git clone <repo-url>

### 2. Install dependencies
npm install

### 3. Configure environment variables
cp .env.example .env
# update values inside .env

### 4. Run tests
npx cucumber-js
