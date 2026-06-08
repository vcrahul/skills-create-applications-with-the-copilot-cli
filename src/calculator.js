/**
 * Simple Calculator
 * Supports the following operations:
 *  - addition (add)
 *  - subtraction (subtract)
 *  - multiplication (multiply)
 *  - division (divide)
 *
 * This module is dependency-free and provides the basic arithmetic functions
 * requested in the repository's latest issue.
 */

/**
 * Parse a value into a number, throwing a clear error for invalid input.
 * @param {string|number} v
 * @returns {number}
 */
function toNumber(v) {
  const n = Number(v);
  if (Number.isNaN(n)) {
    const err = new TypeError(`Invalid number: ${String(v)}`);
    err.code = 'EINVALIDNUMBER';
    throw err;
  }
  return n;
}

/** Addition: returns a + b */
function add(a, b) {
  return toNumber(a) + toNumber(b);
}

/** Subtraction: returns a - b */
function subtract(a, b) {
  return toNumber(a) - toNumber(b);
}

/** Multiplication: returns a * b */
function multiply(a, b) {
  return toNumber(a) * toNumber(b);
}

/** Division: returns a / b. Throws on divide-by-zero. */
function divide(a, b) {
  const na = toNumber(a);
  const nb = toNumber(b);
  if (nb === 0) {
    const err = new RangeError('Division by zero');
    err.code = 'EDIVZERO';
    throw err;
  }
  return na / nb;
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  toNumber
};
