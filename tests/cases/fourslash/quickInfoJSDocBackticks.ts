///<reference path="fourslash.ts" />

// @noEmit: true
// @allowJs: true
// @checkJs: true
// @strict: true
// @Filename: jsdocParseMatchingBackticks.js

/////**
//// * `@param` initial at-param is OK in title comment
//// * @param {string} x hi there `@param`
//// * @param {string} y hi there `@ * param
//// *                   this is the margin
//// * @param {string} z OOPS, unclosed backtick!
//// */
////export function f(x, y, z) {
////    return x/*x*/ + y/*y*/ + z/*z*/
////}
////f/*f*/

goTo.marker("f");
verify.quickInfoIs("function f(x: string, y: string, z: any): string", "`@param` initial at-param is OK in title comment");
goTo.marker("x");
verify.quickInfoIs("(parameter) x: string", "hi there `@param`");
goTo.marker("y");
verify.quickInfoIs("(parameter) y: string", "hi there `@ * param\nthis is the margin\n@param {string} z OOPS, unclosed backtick!");
goTo.marker("z");
verify.quickInfoIs("(parameter) z: any", undefined);
