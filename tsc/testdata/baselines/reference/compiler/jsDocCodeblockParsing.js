//// [tests/cases/compiler/jsDocCodeblockParsing.ts] ////

//// [jsDocCodeblockParsing.ts]
/**
 * text
 * @example Foo
 * ```
 * @Embed[asfasdfasf]
 * ```
 * becomes
 * ```html
 * <div></div>
 * ```
 */
const x = 1;

/**
 * Some text
 * ```
 * @tag inside code
 * ```
 * @param y - a number
 */
function foo(y: number) {}


//// [jsDocCodeblockParsing.js]
"use strict";
/**
 * text
 * @example Foo
 * ```
 * @Embed[asfasdfasf]
 * ```
 * becomes
 * ```html
 * <div></div>
 * ```
 */
const x = 1;
/**
 * Some text
 * ```
 * @tag inside code
 * ```
 * @param y - a number
 */
function foo(y) { }
