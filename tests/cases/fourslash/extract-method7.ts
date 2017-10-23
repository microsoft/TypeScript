/// <reference path='fourslash.ts' />

// You cannot extract a function initializer into the function's body.
// The innermost scope (function_scope_0) is the sibling of the function, not the function itself.

//// function fn(x = /*a*/3/*b*/) {
//// }

goTo.select('a', 'b');
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_0",
    actionDescription: "Extract to function in global scope",
    newContent:
`function fn(x = /*RENAME*/newFunction()) {
}

function newFunction() {
    return 3;
}
`
});
