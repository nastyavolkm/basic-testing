import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Add })).toBe(4);
    expect(simpleCalculator({ a: 0, b: 0, action: Action.Add })).toBe(0);
    expect(simpleCalculator({ a: -1, b: 2, action: Action.Add })).toBe(1);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 8, action: Action.Subtract })).toBe(-2);
    expect(simpleCalculator({ a: 10, b: 10, action: Action.Subtract })).toBe(0);
    expect(simpleCalculator({ a: -4, b: -5, action: Action.Subtract })).toBe(1);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Multiply })).toBe(4);
    expect(simpleCalculator({ a: 2, b: 0, action: Action.Multiply })).toBe(0);
    expect(simpleCalculator({ a: 2, b: -1, action: Action.Multiply })).toBe(-2);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Divide })).toBe(1);
    expect(simpleCalculator({ a: -2, b: 2, action: Action.Divide })).toBe(-1);
    expect(simpleCalculator({ a: 2, b: 0, action: Action.Divide })).toBe(
      Infinity,
    );
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Exponentiate })).toBe(
      4,
    );
    expect(simpleCalculator({ a: 2, b: 0, action: Action.Exponentiate })).toBe(
      1,
    );
    expect(simpleCalculator({ a: 2, b: -1, action: Action.Exponentiate })).toBe(
      1 / 2,
    );
  });

  test('should return null for invalid action', () => {
    const a = 2;
    const b = 2;
    const action = 'invalid';
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const a = 'invalid1';
    const b = 'invalid2';
    const action = Action.Add;
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(null);
  });
});
