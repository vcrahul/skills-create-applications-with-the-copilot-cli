const calc = require('../calculator');

describe('Calculator extended operations', () => {
  test('modulo: 5 % 2 = 1', () => {
    expect(calc.modulo(5, 2)).toBe(1);
  });

  test('modulo throws on division by zero', () => {
    expect(() => calc.modulo(5, 0)).toThrow(RangeError);
    try {
      calc.modulo(5, 0);
    } catch (e) {
      expect(e.code).toBe('EMODZERO');
    }
  });

  test('power: 2^3 = 8 and base^0 = 1', () => {
    expect(calc.power(2, 3)).toBe(8);
    expect(calc.power(5, 0)).toBe(1);
  });

  test('power handles fractional exponents', () => {
    expect(calc.power(9, 0.5)).toBeCloseTo(3);
  });

  test('squareRoot: sqrt(16) = 4', () => {
    expect(calc.squareRoot(16)).toBe(4);
  });

  test('squareRoot of non-perfect square returns floating point', () => {
    expect(calc.squareRoot(2)).toBeCloseTo(Math.SQRT2);
  });

  test('squareRoot throws on negative numbers with code ESQRTNEG', () => {
    expect(() => calc.squareRoot(-1)).toThrow(RangeError);
    try {
      calc.squareRoot(-1);
    } catch (e) {
      expect(e.code).toBe('ESQRTNEG');
    }
  });
});
