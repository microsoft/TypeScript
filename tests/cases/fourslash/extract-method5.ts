/// <reference path='fourslash.ts' />

// Extraction in the context of a contextual
// type needs to produce an explicit return type
// annotation in the extracted function

//// function f() {
////     var x: 1 | 2 | 3 = /*start*/1 + 1 === 2 ? 1 : 2/*end*/;
//// }

goTo.select('start', 'end');
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_0",
    actionDescription: "Extract to inner function in function 'f'",
    newContent:
`function f() {
    var x: 1 | 2 | 3 = /*RENAME*/newFunction();

    function newFunction(): 1 | 2 | 3 {
        return 1 + 1 === 2 ? 1 : 2;
    }
}`
});
