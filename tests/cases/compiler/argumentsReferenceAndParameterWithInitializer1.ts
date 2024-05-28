// @strict: true
// @checkJs: true
// @lib: dom, esnext
// @noEmit: true

// @filename: index.js

'use strict';

// https://github.com/microsoft/TypeScript/issues/57435

/** @type {globalThis['structuredClone']} */
const structuredClone =
  globalThis.structuredClone ??
  function structuredClone (value, options = undefined) {
    if (arguments.length === 0) {
      throw new TypeError('missing argument')
    }
    return value;
  }

/** @type {(a: number, b: boolean | undefined, ...rest: string[]) => void} */
const test1 = function(value, options = undefined) {
  if (arguments.length === 0) {
    throw new TypeError('missing argument')
  }
}

/** @type {(a: number, b: boolean | undefined, ...rest: string[]) => void} */
const test2 = function inner(value, options = undefined) {
  const args = [].slice.call(arguments);

  inner(1, true, 'hello', 'world');
}

/** @type {(a: number, b: boolean | undefined) => void} */
const test3 = function inner(value, options = undefined) {
  const args = [].slice.call(arguments);
}

/** @type {(a: number, b: boolean | undefined, ...rest: [string?, ...number[]]) => void} */
const test4 = function inner(value, options = undefined) {
  const args = [].slice.call(arguments);
}

/** @type {(a: number, b: boolean | undefined, ...rest: [string, ...number[]]) => void} */
const test5 = function inner(value, options = undefined) {
  const args = [].slice.call(arguments);
}

/** @type {(a: number, b: boolean | undefined, ...rest: [string, ...number[]]) => void} */
const test6 = function inner(value, options = undefined, third) {
  const args = [].slice.call(arguments);
}

/** @type {(a: number, b: boolean | undefined, ...rest: number[]) => void} */
const test7 = function inner(value, options = undefined, third) {
  const args = [].slice.call(arguments);
}

/** @type {(a: number, b?: boolean, ...rest: string[]) => void} */
const test8 = function inner(value, options = undefined) {
  const args = [].slice.call(arguments);
}

/** @type {(a: number, b?: boolean, ...rest: string[]) => void} */
const test9 = function inner(value, options = undefined, third) {
  const args = [].slice.call(arguments);
}

/** @type {(a: number, b?: boolean, ...rest: [string, ...number[]]) => void} */
const test10 = function inner(value, options = undefined) {
  const args = [].slice.call(arguments);
}

/** @type {(a: number, b?: boolean, ...rest: [string?, ...number[]]) => void} */
const test11 = function inner(value, options = undefined) {
  const args = [].slice.call(arguments);
}

/** @type {(a: number, b?: boolean, ...rest: [string, ...number[]]) => void} */
const test12 = function inner(value, options = undefined, third) {
  const args = [].slice.call(arguments);
}

/** @type {(a: number, b?: boolean, ...rest: [string?, ...number[]]) => void} */
const test13 = function inner(value, options = undefined, third) {
  const args = [].slice.call(arguments);
}

/** @type {(a: number, b?: boolean, ...rest: [string?, string?]) => void} */
const test14 = function inner(value, options = undefined) {
  const args = [].slice.call(arguments);
}

/** @type {(a: number, b?: boolean, ...rest: [string?, string?]) => void} */
const test15 = function inner(value, options = undefined, third) {
  const args = [].slice.call(arguments);
}

/** @type {(a: number, b?: boolean, ...rest: [string, string]) => void} */
const test16 = function inner(value, options = undefined) {
  const args = [].slice.call(arguments);
}

/** @type {(a: number, b?: boolean, ...rest: [string, string]) => void} */
const test17 = function inner(value, options = undefined, third) {
  const args = [].slice.call(arguments);
}

const test18 = function inner(value, options = undefined) {
  const args = [].slice.call(arguments);
}

const test19 = function inner(value, options = undefined, third) {
  const args = [].slice.call(arguments);
}

/**
 * @param {number} [b]
 */
function test20(a, b = 10, c) {
  const args = [].slice.call(arguments);
}

/** @type {(a: number, b?: boolean, ...rest: [string, string]) => void} */
function test21(a, b = true, c) {
  const args = [].slice.call(arguments);
}

export {}
