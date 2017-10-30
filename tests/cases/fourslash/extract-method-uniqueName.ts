/// <reference path='fourslash.ts' />

////// newFunction
/////*start*/1 + 1/*end*/;

// NOTE: '// newFunction' should be included, but due to incorrect handling of trivia,
// it's omitted right now.
goTo.select('start', 'end')
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_0",
    actionDescription: "Extract to function in global scope",
    newContent:
`// newFunction
/*RENAME*/newFunction_1();

function newFunction_1() {
    1 + 1;
}
`
});
