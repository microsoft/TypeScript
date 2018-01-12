/// <reference path='fourslash.ts' />

////function f(x: number): number {
////    /*start*/switch (x) {case 0:
////return 0;}/*end*/
////}

goTo.select('start', 'end')
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_1",
    actionDescription: "Extract to function in global scope",
    newContent: `function f(x: number): number {
    return /*RENAME*/newFunction(x);
}

function newFunction(x: number) {
    switch (x) {
        case 0:
            return 0;
    }
}
`
});
