import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 0, b: 0, action: Action.Add, expected: 0 },
  { a: -1, b: 2, action: Action.Add, expected: 1 },
  { a: 6, b: 8, action: Action.Subtract, expected: -2 },
  { a: 10, b: 10, action: Action.Subtract, expected: 0 },
  { a: -4, b: -5, action: Action.Subtract, expected: 1 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 2, b: 0, action: Action.Multiply, expected: 0 },
  { a: -1, b: 2, action: Action.Multiply, expected: -2 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: -2, b: 2, action: Action.Divide, expected: -1 },
  { a: 2, b: 0, action: Action.Divide, expected: Infinity },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 2, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: -1, action: Action.Exponentiate, expected: 1 / 2 },
  { a: 'invalid1', b: 'invalid2', action: Action.Add, expected: null },
  { a: 2, b: 1, action: 'invalid', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('%#: "%s"', ({ a, b, action, expected }) =>
    expect(simpleCalculator({ a, b, action })).toBe(expected),
  );
});
