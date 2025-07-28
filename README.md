# QA Dojo - E2E Testing Project

This project contains end-to-end tests for e-commerce platform using Playwright test framework.

## Project Structure

```
├── app/
│   ├── types/
│   │   └── types.ts            # Type definitions
│   └── ui/
│       ├── components/         # Reusable UI components
│       │   ├── header.component.ts
│       │   ├── productCard.component.ts
│       │   └── search.component.ts
│       ├── modals/            # Modal window components
│       │   ├── cookieDialogue.modal.ts
│       │   └── sizeSelector.modal.ts
│       └── pages/             # Page Object Models
│           ├── BasePage.ts
│           ├── CartPage.ts
│           ├── EntryPage.ts
│           ├── LoginPage.ts
│           ├── MainPage.ts
│           └── SearchResultPage.ts
├── tests/
│   ├── e2e/                   # E2E test scenarios
│   │   └── main-scenario.spec.ts
│   └── testdata/             # Test data
│       └── countries-dictionary.ts
├── playwright-report/         # Test execution reports
└── test-results/             # Test execution artifacts
```

## Features

- Cross-browser testing (Chrome, Firefox, Safari)
- Page Object Model pattern implementation
- Geolocation support
- Multi-language support
- Cookie handling
- Shopping cart operations
- Product search and filtering
- Size selection functionality

## Prerequisites

- Node.js (latest LTS version)
- npm (comes with Node.js)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/DmytroRakovskyi/e-commerce-project-qa-dojo
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

### Run all tests:

```bash
npx playwright test
```

### Run specific test file:

```bash
npx playwright test main-scenario.spec.ts
```

### Run tests in specific browser:

```bash
npm run test:chromium  # Run tests in Chrome
npm run test:firefox   # Run tests in Firefox
npm run test:safari    # Run tests in Safari
```

### Run tests with UI mode:

```bash
npx playwright test --ui
```

## Test Reports

After test execution, HTML report will be generated in the `playwright-report` directory. To view the report:

```bash
npm run report
```

## Configuration

## Main Test Scenarios

1. Entry Page Navigation
2. Cookie Consent Handling
3. Country and Language Selection
4. Product Search and Category Selection
5. Size Selection and Cart Operations
6. User Registration Flow

## Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

## Best Practices

- Use Page Object Model for better maintainability
- Keep test data separate from test logic
- Use meaningful test descriptions
- Follow AAA (Arrange-Act-Assert) pattern
- Implement proper error handling
- Use explicit waits instead of hard-coded timeouts
- Keep tests independent and isolated
