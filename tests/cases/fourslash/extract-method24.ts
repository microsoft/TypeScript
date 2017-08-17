/// <reference path='fourslash.ts' />

//// function M() {
////     let a = [1,2,3];
////     let x = 0;
////     console.log(/*a*/a[x]/*b*/);
//// }

goTo.select('a', 'b')
edit.applyRefactor('Extract Method', 'scope_1');
verify.currentFileContentIs(`function M() {
    let a = [1,2,3];
    let x = 0;
    console.log(newFunction(a, x));
}
function newFunction(a: number[], x: number): any {
    return a[x];
}
`);