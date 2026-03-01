/// <reference path='fourslash.ts' />

////function satisfies<A>() {
////    return /*start*/<T extends A>(x: T) => x/*end*/;
////}

goTo.select('start', 'end');
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_1",
    actionDescription: "Extract to function in global scope",
    newContent:
`function satisfies<A>() {
    return /*RENAME*/newFunction<A>();
}

function newFunction<A>() {
    return <T extends A>(x: T) => x;
}
`});
