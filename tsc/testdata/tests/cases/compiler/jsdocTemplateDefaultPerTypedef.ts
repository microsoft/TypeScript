// @allowJs: true
// @checkJs: true
// @noEmit: true
// @strict: false
// @filename: jsdocTemplateDefaultPerTypedef.js

// Each typedef in a JSDoc comment gets its own copy of the @template type
// parameters of the comment, so the default type literal of T is copied
// once per typedef, and the copies start at the same position. An array
// literal of a value of each typedef keeps one of the two copies, and a
// union with the first typedef shows which one it keeps. The groups use
// their typedefs in opposite orders, before the typedefs are checked.

/** @type {A1} */
let a1;
/** @type {B1} */
let b1;
const r1 = [a1, b1];
/** @type {typeof r1[number] | A1} */
let u1;

/** @type {B2} */
let b2;
/** @type {A2} */
let a2;
const r2 = [b2, a2];
/** @type {typeof r2[number] | A2} */
let u2;

/**
 * @template [T={ x: number }]
 * @typedef {T} A1
 * @typedef {T} B1
 */

/**
 * @template [T={ x: number }]
 * @typedef {T} A2
 * @typedef {T} B2
 */
let unused;
