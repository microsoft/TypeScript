/// <reference path='fourslash.ts' />

// Don't emit type annotations in JavaScript files
// Also tests that single-variable return extractions don't get superfluous destructuring

// @allowNonTsExtensions: true
// @Filename: foo.js
//// function foo() {
////     var i = 10;
////     /*a*/return i++;/*b*/
//// }

goTo.select('a', 'b');
edit.applyRefactor('Extract Method', 'scope_1');
verify.currentFileContentIs(`function foo() {
    var i = 10;
    var __return: any;
    ({ i, __return } = newFunction(i));
    return __return;
}
function newFunction(i) {
    return { i, __return: i++ };
}
`);