const assert = require('assert');
const { test } = require('node:test');

const Calendar = require('../src/calendar');

const calculationCases = [
    {
        name: 'same day in same month returns zero',
        input: [3, 10, 3, 10, 2024],
        expected: 0,
    },
    {
        name: 'different days in same month',
        input: [3, 10, 3, 15, 2024],
        expected: 5,
    },
    {
        name: 'adjacent days across months',
        input: [1, 31, 2, 1, 2024],
        expected: 1,
    },
    {
        name: 'across multiple months with middle months',
        input: [1, 15, 4, 10, 2023],
        expected: 85,
    },
    {
        name: '31-day month end boundary',
        input: [1, 1, 2, 1, 2023],
        expected: 31,
    },
    {
        name: '30-day month end boundary',
        input: [4, 1, 5, 1, 2023],
        expected: 30,
    },
    {
        name: 'February in common year',
        input: [2, 1, 3, 1, 2023],
        expected: 28,
    },
    {
        name: 'February in leap year',
        input: [2, 1, 3, 1, 2024],
        expected: 29,
    },
    {
        name: 'year 1900 is common year',
        input: [2, 1, 3, 1, 1900],
        expected: 28,
    },
    {
        name: 'year 2000 is leap year',
        input: [2, 1, 3, 1, 2000],
        expected: 29,
    },
    {
        name: 'valid lower input boundaries',
        input: [1, 1, 1, 1, 1],
        expected: 0,
    },
    {
        name: 'valid upper input boundaries',
        input: [12, 31, 12, 31, 10000],
        expected: 0,
    },
];

for (const { name, input, expected } of calculationCases) {
    test(name, () => {
        assert.strictEqual(Calendar.main(...input), expected);
    });
}

const errorCases = [
    {
        name: 'same month with day1 greater than day2 throws',
        input: [3, 15, 3, 10, 2024],
        message: /day1 must be less than day2/,
    },
    {
        name: 'invalid month1 below lower bound',
        input: [0, 1, 2, 1, 2024],
        message: /invalid month1/,
    },
    {
        name: 'invalid month1 above upper bound',
        input: [13, 1, 13, 2, 2024],
        message: /invalid month1/,
    },
    {
        name: 'invalid month2 below lower bound',
        input: [1, 1, 0, 1, 2024],
        message: /invalid month2/,
    },
    {
        name: 'invalid month2 above upper bound',
        input: [1, 1, 13, 1, 2024],
        message: /invalid month2/,
    },
    {
        name: 'invalid day1 below lower bound',
        input: [1, 0, 2, 1, 2024],
        message: /invalid day1/,
    },
    {
        name: 'invalid day1 above upper bound',
        input: [1, 32, 2, 1, 2024],
        message: /invalid day1/,
    },
    {
        name: 'invalid day2 below lower bound',
        input: [1, 1, 2, 0, 2024],
        message: /invalid day2/,
    },
    {
        name: 'invalid day2 above upper bound',
        input: [1, 1, 2, 32, 2024],
        message: /invalid day2/,
    },
    {
        name: 'invalid year below lower bound',
        input: [1, 1, 2, 1, 0],
        message: /invalid year/,
    },
    {
        name: 'invalid year above upper bound',
        input: [1, 1, 2, 1, 10001],
        message: /invalid year/,
    },
    {
        name: 'month1 greater than month2 throws',
        input: [5, 1, 4, 1, 2024],
        message: /month1 must be less than month2/,
    },
];

for (const { name, input, message } of errorCases) {
    test(name, () => {
        assert.throws(() => Calendar.main(...input), message);
    });
}
