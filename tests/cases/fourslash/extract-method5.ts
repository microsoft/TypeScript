/// <reference path='fourslash.ts' />

// Extraction in the context of a contextual
// type needs to produce an explicit return type
// annotation in the extracted function

//// function f() {
////     var x: 1 | 2 | 3 = /*start*/2/*end*/;
//// }

goTo.select('start', 'end');
edit.applyRefactor('Extract Method', 'scope_0');
verify.currentFileContentIs(
`function f() {
    var x: 1 | 2 | 3 = newFunction();

    function newFunction(): 1 | 2 | 3 {
        return 2;
    }
}`);