/// <reference path='fourslash.ts' />

////async function f(xs: AsyncIterable<number>) {
////    /*a*/for await (const x of xs) {
////        x * 2;
////    }/*b*/
////}

goTo.select('a', 'b')
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_1",
    actionDescription: "Extract to function in global scope",
    newContent:
`async function f(xs: AsyncIterable<number>) {
    /*RENAME*/newFunction(xs);
}

function newFunction(xs: any) {
    for await (const x of xs) {
        x * 2;
    }
}
`
});
