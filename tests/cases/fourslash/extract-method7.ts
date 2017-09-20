/// <reference path='fourslash.ts' />

// You cannot extract a function initializer into the function's body.
// The innermost scope (scope_0) is the sibling of the function, not the function itself.

//// function fn(x = /*a*/3/*b*/) {
//// }

goTo.select('a', 'b');
edit.applyRefactor({
    refactorName: "Extract Method",
    actionName: "scope_0",
    actionDescription: "Extract function into global scope",
    newContent:
`function fn(x = /*RENAME*/newFunction()) {
}
function newFunction() {
    return 3;
}
`
});
