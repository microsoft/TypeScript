/// <reference path='fourslash.ts' />

// Extraction in the context of a contextual
// type needs to produce an explicit return type
// annotation in the extracted function

//// function f() {
////     var x: 1 | 2 | 3 = /*start*/1 + 1 === 2 ? 1 : 2/*end*/;
//// }

goTo.select('start', 'end');
edit.applyRefactor({
    refactorName: "Extract Method",
    actionName: "scope_0",
    actionDescription: "Extract function into function 'f'",
});
// TODO: GH#18091 (fix formatting to use `2 ? 1 :` and not `2?1:`)
verify.currentFileContentIs(
`function f() {
    var x: 1 | 2 | 3 = newFunction();

    function newFunction(): 1 | 2 | 3 {
        return 1 + 1 === 2?1: 2;
    }
}`);