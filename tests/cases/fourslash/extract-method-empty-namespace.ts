/// <reference path='fourslash.ts' />

////function f() {
////    /*start*/namespace N {}/*end*/
////}

goTo.select('start', 'end')
edit.applyRefactor({
    refactorName: "Extract Method",
    actionName: "scope_1",
    actionDescription: "Extract to function in global scope",
    newContent: `function f() {
    /*RENAME*/newFunction();
}
function newFunction() {
    namespace N { }
}
`
});
