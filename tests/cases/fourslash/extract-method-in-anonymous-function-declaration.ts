/// <reference path='fourslash.ts' />

////export default function() {
////    /*start*/0/*end*/;
////}

goTo.select('start', 'end')
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_0",
    actionDescription: "Extract to inner function in anonymous function",
    newContent:
`export default function() {
    /*RENAME*/newFunction();

    function newFunction() {
        0;
    }
}`
});
