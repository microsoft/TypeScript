//// [tests/cases/conformance/jsdoc/jsdocTemplateTagNameResolution.ts] ////

//// [file.js]
/**
 * @template T
 * @template {keyof T} K
 * @typedef {T[K]} Foo
 */

const x = { a: 1 };

/** @type {Foo<typeof x, "a">} */
const y = "a";

//// [file.js]
/**
 * @template T
 * @template {keyof T} K
 * @typedef {T[K]} Foo
 */
const x = { a: 1 };
/** @type {Foo<typeof x, "a">} */
const y = "a";


//// [file.d.ts]
/**
 * @template T
 * @template {keyof T} K
 * @typedef {T[K]} Foo
 */
type Foo<T, K extends keyof T> = T[K];
declare const x: {
    a: number;
};
/** @type {Foo<typeof x, "a">} */
declare const y: Foo<typeof x, "a">;
