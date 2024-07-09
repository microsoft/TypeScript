/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noEmit: true
// @noImplicitAny: false
// @Filename: important.js

////[|function f(foo) {
////    foo += 2
////    return foo
////}|]


verify.rangeAfterCodeFix(`/** 
 * @param {number} foo
 */
function f(foo) {
    foo += 2
    return foo
}
`);
