/// <reference path='fourslash.ts' />

// Don't try to propagate property accessed variables back,
// or emit spurious returns when the value is clearly ignored

//// function fn() {
////     const x = { m: 1 };
////     /*a*/x.m = 3/*b*/;
//// }

goTo.select('a', 'b')
verify.refactorAvailable('Extract Method');
edit.applyRefactor('Extract Method', "scope_1");
verify.currentFileContentIs(`function fn() {
    const x = { m: 1 };
    newFunction(x);
}
function newFunction(x: { m: number; }) {
    x.m = 3;
}
`);
