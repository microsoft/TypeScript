/// <reference path='fourslash.ts' />

// You cannot extract a function initializer into the function's body.
// The innermost scope (scope_0) is the sibling of the function, not the function itself.

//// function fn(x = /*a*/3/*b*/) {
//// }

goTo.select('a', 'b');
edit.applyRefactor('Extract Method', 'scope_0');
verify.currentFileContentIs(`function fn(x = newFunction()) {
}
function newFunction() {
    return 3;
}
`);
