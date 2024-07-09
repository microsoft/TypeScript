// @allowJs: true
// @checkJs: true
// @declaration: true
// @outDir: out
// @Filename: file.js

/**
 * @template {string | number} [T=string] - ok: defaults are permitted
 * @typedef {[T]} A
 */

/** @type {A} */ // ok, default for `T` in `A` is `string`
const aDefault1 = [""];
/** @type {A} */ // error: `number` is not assignable to string`
const aDefault2 = [0];
/** @type {A<string>} */ // ok, `T` is provided for `A`
const aString = [""];
/** @type {A<number>} */ // ok, `T` is provided for `A`
const aNumber = [0];

/**
 * @template T
 * @template [U=T] - ok: default can reference earlier type parameter
 * @typedef {[T, U]} B
 */

/**
 * @template {string | number} [T] - error: default requires an `=type`
 * @typedef {[T]} C
 */

/**
 * @template {string | number} [T=] - error: default requires a `type`
 * @typedef {[T]} D
 */

/**
 * @template {string | number} [T=string]
 * @template U - error: Required type parameters cannot follow optional type parameters
 * @typedef {[T, U]} E
 */

/**
 * @template [T=U] - error: Type parameter defaults can only reference previously declared type parameters.
 * @template [U=T]
 * @typedef {[T, U]} G
 */

/**
 * @template T
 * @template [U=T] - ok: default can reference earlier type parameter
 * @param {T} a
 * @param {U} b
 */
function f1(a, b) {}

 /**
 * @template {string | number} [T=string]
 * @template U - error: Required type parameters cannot follow optional type parameters
 * @param {T} a
 * @param {U} b
 */
function f2(a, b) {}

/**
 * @template [T=U] - error: Type parameter defaults can only reference previously declared type parameters.
 * @template [U=T]
 * @param {T} a
 * @param {U} b
 */
function f3(a, b) {}
