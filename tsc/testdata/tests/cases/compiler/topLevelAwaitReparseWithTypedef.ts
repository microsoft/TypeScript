// @noEmit: true
// @checkJs: true
// @filename: main.js

// https://github.com/microsoft/typescript-go/issues/4252

const obj = { await: 42 }
export const x = obj.await;

/**
 * @typedef {object} Foo
 * @property {string} name
 */

/** @type {Foo} foo */
let foo;
