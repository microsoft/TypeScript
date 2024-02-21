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

export {}