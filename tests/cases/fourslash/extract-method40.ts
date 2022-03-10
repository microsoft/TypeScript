/// <reference path='fourslash.ts' />

////const foo = /*start*/{
////    a: 1,
////    b: () => { return 1; }
////}/*end*/

goTo.select("start", "end");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_0",
    actionDescription: "Extract to function in global scope",
    newContent:
`const foo = /*RENAME*/newFunction()

function newFunction() {
    return {
        a: 1,
        b: () => { return 1; }
    };
}
`
});
