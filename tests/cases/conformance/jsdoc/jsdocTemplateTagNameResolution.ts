// @allowJs: true
// @checkJs: true
// @outDir: out
// @declaration: true
// @Filename: file.js

/**
 * @template T
 * @template {keyof T} K
 * @typedef {T[K]} Foo
 */

const x = { a: 1 };

/** @type {Foo<typeof x, "a">} */
const y = "a";