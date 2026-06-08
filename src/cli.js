#!/usr/bin/env node
/**
 * CLI for the simple calculator in calculator.js
 * Supports: add (+), subtract (-), multiply (x/*), divide (/)
 *
 * Usage examples:
 *   node src/cli.js add 2 3     -> 5
 *   node src/cli.js + 10 4      -> 14
 *   node src/cli.js divide 8 2  -> 4
 */

const { add, subtract, multiply, divide } = require('./calculator');

function usage() {
  console.log('Usage: node src/cli.js <operation> <a> <b>');
  console.log('Operations: add(+), subtract(-), multiply(*,x), divide(/)');
  console.log('Example: node src/cli.js add 2 3');
}

function exitWithError(msg, code = 1) {
  console.error(msg);
  process.exit(code);
}

const argv = process.argv.slice(2);
if (argv.length === 0) {
  usage();
  process.exit(0);
}

if (argv.length !== 3) {
  usage();
  exitWithError('Error: expected exactly 3 arguments (operation, a, b)', 2);
}

const [opRaw, aRaw, bRaw] = argv;
const op = opRaw.toLowerCase();

function compute(op, a, b) {
  switch (op) {
    case 'add':
    case '+':
    case 'plus':
      return add(a, b);

    case 'subtract':
    case '-':
    case 'minus':
      return subtract(a, b);

    case 'multiply':
    case '*':
    case 'x':
    case 'times':
      return multiply(a, b);

    case 'divide':
    case '/':
    case '÷':
      return divide(a, b);

    default:
      exitWithError(`Unsupported operation: ${opRaw}`, 2);
  }
}

try {
  const result = compute(op, aRaw, bRaw);
  // Print only the result to stdout for easy automation.
  console.log(result);
  process.exit(0);
} catch (err) {
  if (err && err.code === 'EINVALIDNUMBER') {
    exitWithError(`Invalid numeric input: ${err.message}`, 2);
  }
  if (err && err.code === 'EDIVZERO') {
    exitWithError(`Error: ${err.message}`, 3);
  }
  // Unknown error
  exitWithError(`Error: ${err && err.message ? err.message : String(err)}`, 1);
}
