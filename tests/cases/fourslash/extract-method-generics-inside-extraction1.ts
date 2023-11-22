/// <reference path='fourslash.ts' />

////function f() {
////    let g = /*start*/<T>(x: T) => x/*end*/;
////    return g;
////}

goTo.select('start', 'end');
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_1",
    actionDescription: "Extract to function in global scope",
    newContent:
`function f() {
    let g = /*RENAME*/newFunction();
    return g;
}

function newFunction() {
    return <T>(x: T) => x;
}
`});
