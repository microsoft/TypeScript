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
    refactorName: "Extract Symbol",
    actionName: "function_scope_1",
    actionDescription: "Extract to function in global scope",
    newContent:
`function foo() {
    var i = 10;
    let __return;
    ({ __return, i } = /*RENAME*/newFunction(i));
    return __return;
}

function newFunction(i) {
    return { __return: i++, i };
}
`
});
