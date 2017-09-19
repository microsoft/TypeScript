/// <reference path='fourslash.ts' />

// TODO: GH#18546
// For now this tests that at least we don't crash.

////function f() {
////    /*start*/namespace N {}/*end*/
////}

goTo.select('start', 'end')
edit.applyRefactor({
    refactorName: "Extract Method",
    actionName: "scope_1",
    actionDescription: "Extract to function in global scope",
    newContent: `function f() {
    /*RENAME*/newFunction(N);
}
function newFunction(N: any) {
    namespace N { }
}
`
});
