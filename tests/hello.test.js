const { formatGreeting } = require('../src/hello/index.js');

describe('formatGreeting', () => {
    test('name provided, shout = false', () => {
        const result = formatGreeting('Caleb', false);
        expect(result).toBe('Hello, Caleb!');
    });

    test('name provided, shout = true', () => {
        const result = formatGreeting('Caleb', true);
        expect(result).toBe('HELLO, Caleb!');
    });

    test('different name, shout = false', () => {
        const result = formatGreeting('Alice', false);
        expect(result).toBe('Hello, Alice!');
    });

    test('different name, shout = true', () => {
        const result = formatGreeting('Bob', true);
        expect(result).toBe('HELLO, Bob!');
    });
});

