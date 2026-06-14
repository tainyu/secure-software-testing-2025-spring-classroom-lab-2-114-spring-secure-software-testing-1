# Homework 7

## Mutation Testing with StrykerJS

This folder contains the Homework 7 mutation testing project for `src/calendar.js`.

## Project Structure

- `src/`: source code under test
- `test/`: Node.js built-in `node:test` test suite
- `reports/mutation/`: StrykerJS mutation testing HTML report
- `package.json`: npm scripts and dependencies
- `stryker.config.json`: StrykerJS configuration

## How to Run

```shell
npm install
npm test
npm run mutate
```

## Final Mutation Testing Result

- Tool: StrykerJS
- Total Mutants = 106
- Killed = 104
- Timeout = 2
- Survived = 0
- Mutation Score = 100%
