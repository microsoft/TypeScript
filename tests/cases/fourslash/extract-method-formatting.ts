/// <reference path='fourslash.ts' />

////function f(x: number): number {
////    /*start*/switch (x) {case 0:
////return 0;}/*end*/
////}

goTo.select('start', 'end')
edit.applyRefactor({
    refactorName: "Extract Method",
    actionName: "scope_1",
    actionDescription: "Extract to function in global scope",
});
verify.currentFileContentIs(
`function f(x: number): number {
    return newFunction(x);
}
function newFunction(x: number) {
    switch (x) {
        case 0:
            return 0;
    }
}
`);
