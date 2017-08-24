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
edit.applyRefactor({
    refactorName: "Extract Method",
    actionName: "scope_1",
    actionDescription: "Extract function into global scope",
    newContent:
// TODO: GH#18048
`function foo() {
    var i = 10;
    var __return: any;
    ({ __return, i } = newFunction(i));
    return __return;
}
function newFunction(i) {
    return { __return: i++, i };
}
`
});