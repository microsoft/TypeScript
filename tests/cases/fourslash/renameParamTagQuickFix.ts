/// <reference path='fourslash.ts' />

// Test for JSDoc @param quick fix reformatting issue

// @Filename: /a.js
//// /**
////  * 
////  * @param eks {string} the first param
////  * @param y {number} the second param
////  */
//// function foo(x, y) {
//// }

verify.codeFix({
    description: "Rename '@param' tag name 'eks' to 'x'",
    index: 0,
    newFileContent:
`/**
 * 
 * @param x {string} the first param
 * @param y {number} the second param
 */
function foo(x, y) {
}`,
});
