/// <reference path='fourslash.ts' />

////function foo(bar?: number) {
////    /*a*/bar?.toString();/*b*/
////}

goTo.select('a', 'b')
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_0",
    actionDescription: "Extract to inner function in function 'foo'",
    newContent:
`function foo(bar?: number) {
    /*RENAME*/newFunction();

    function newFunction() {
        bar?.toString();
    }
}`
});
