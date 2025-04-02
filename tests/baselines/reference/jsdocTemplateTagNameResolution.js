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
var x = { a: 1 };
/** @type {Foo<typeof x, "a">} */
var y = "a";


//// [file.d.ts]
declare namespace x {
    let a: number;
}
/** @type {Foo<typeof x, "a">} */
declare const y: Foo<typeof x, "a">;
type Foo<T, K extends keyof T> = T[K];
