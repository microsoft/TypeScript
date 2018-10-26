// @allowJs: true
// @checkJs: true
// @noEmit: true
// @noImplicitAny: true
// @Filename: a.js
/**
 * @typedef {number}
 */
var nameless;

/**
 * @typedef {number} named
 */
var this_is_not_the_name = true;

nameless = 123; // nameless is not a value

/**
 * @param {named} p1
 * @param {nameless} p2
 */
function abc(p1, p2) {}

/**
 * @param {named} p1
 * @param {nameless} p2
 */
export function breakThings(p1, p2) {}

/** @typedef {number} */
var notOK = 1;

/** @typedef {string} */
let thisIsOK;

/** @typedef {{L: number}} */
const notLegalButShouldBe;

// @Filename: b.js
/**
 * @typedef {{
 *   p: string
 * }}
 */
export var type1;

// @Filename: c.js
import { type1 as aliased } from './b';

/**
 * @param {aliased} pt1
 */
function f1(pt1) {}

/** @type {{ p2?: any }} */
var k = {};

/**
 * @typedef {aliased}
 */
k.p2;

