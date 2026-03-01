# Sample App Web

This repository contains a demo e-commerce web app built for testing and examples.

[Live demo](https://ayushmamaharjan.github.io/app_demo/) — Click to open the deployed site (GitHub Pages)

[![Build Status](https://github.com/ayushmamaharjan/app_demo/actions/workflows/sample-app-web.yml/badge.svg)](https://github.com/ayushmamaharjan/app_demo/actions/workflows/sample-app-web.yml)
[![Test Coverage](https://img.shields.io/badge/coverage-check%20in%20actions-brightgreen)](https://github.com/ayushmamaharjan/app_demo/actions)

Quick access
- **Live demo:** https://ayushmamaharjan.github.io/app_demo/
- **Deploy workflow:** [.github/workflows/github-pages.yml](.github/workflows/github-pages.yml)

Quick start
1. Install dependencies

        npm install

2. Start development server

        npm run start

3. Build for production

        npm run build

Full documentation and testing details are below.

- [Setup](#setup)
- [Test](#test)
- [Deploy](#deploy)

## Setup

### Requirements
1. Node.js (recommended: an active LTS). Use `nvm` to manage versions.
2. OpenJDK 8 for end-to-end tests
3. Google Chrome for running browser tests

Clone the project (example):

    git clone git@github.com:ayushmamaharjan/app_demo.git

Install dependencies:

    npm install

### Error reporting with Backtrace

To set up error reporting with your Backtrace instance:

1. Open `src/index.jsx` file and find the `BacktraceClient.initialize` function call:

    ```tsx
    BacktraceClient.initialize({
        name: 'Swag Store',
        version: '3.0.0',
        url: 'https://submit.backtrace.io/UNIVERSE/TOKEN/json',
        userAttributes: () => ({
            user: currentUser(),
            shoppingCart: ShoppingCart.getCartContents()
        })
    })
    ```

2. Replace `UNIVERSE` and `TOKEN` in `url` with your universe and token.

See `src/index.jsx` for Backtrace setup details.

### Build

1. Build the application with

        npm run start

    This will build the application, start Chrome and load the website on http://localhost:3000/

2. Click around - this is the app!

### Sourcemaps in error reporting with Backtrace

To enable additional insight in Backtrace, you can send built sourcemaps and sources to Backtrace:

1. Open `.backtracejsrc` file
2. Replace `UNIVERSE` and `TOKEN` in `upload.url` with your universe and token.
3. Build the application with

        npm run build

4. Run `backtrace-js`

        npm run backtrace.sourcemaps

5. Host the app using e.g. `http-server` (sourcemaps integration won't work with `npm run start`)

        npx http-server -p 3000 ./build

6. New uploaded errors should display with sourcemaps attached!

Check `.backtracejsrc` for sourcemap configuration.

### Storybook

Run Storybook locally:

    npm run storybook

This will open Storybook on http://localhost:6006/

## Test

### E2E

#### Testing locally

To run the application test suite (which uses Webdriver.io, Selenium, and Chrome) make sure the application is running on http://localhost:3000/ (see above steps)

    npm run test.e2e.local

This will run the application test suite

#### Testing on Sauce Labs

Running on Sauce Labs uses Environment Variables to authenticate credentials.

1. `npm run test.e2e.sauce.us` to run tests on the Sauce Labs in the US Data Center
2. `npm run test.e2e.sauce.eu` to run tests in the EU Data Center

> Make sure you've added the `SCREENER_API_KEY` variable to your environment variables.

### Visual Component Testing

You can test the components with Screener Component testing by running the following commands

    # This will test all components on Chrome only
    npm run test.storybook.ci

    # This will test all components on Chrome and Safari in mobile viewports
    npm run test.storybook.mobile

    # This will test all components on Chrome, Safari, Firefox and Safari with different desktop resolutions
    npm run test.storybook.desktop

Each PR to main will also test the components with the `test.storybook.ci`-command.

> Make sure you've added the `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY` variables to your environment variables.

## Deploy

Merges to main will automatically trigger [the GitHub Pages workflow](.github/workflows/github-pages.yml) and deploy to:
* https://ayushmamaharjan.github.io/app_demo/

---

**Deployed by:** Ayushma Maharjan

*This is a showcase project demonstrating a modern React e-commerce application with comprehensive testing, CI/CD automation, and GitHub Pages deployment.*
