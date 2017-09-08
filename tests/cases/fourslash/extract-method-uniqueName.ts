/// <reference path='fourslash.ts' />

////// newFunction
/////*start*/1 + 1/*end*/;

goTo.select('start', 'end')
edit.applyRefactor({
    refactorName: "Extract Method",
    actionName: "scope_0",
    actionDescription: "Extract function into global scope",
    newContent:
`// newFunction
/*RENAME*/newFunction_1();

function newFunction_1() {
    // newFunction
    1 + 1;
}
`
});
