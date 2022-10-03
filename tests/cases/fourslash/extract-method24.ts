/// <reference path='fourslash.ts' />

//// function M() {
////     let a = [1,2,3];
////     let x = 0;
////     console.log(/*a*/a[x]/*b*/);
//// }

goTo.select('a', 'b')
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_1",
    actionDescription: "Extract to function in global scope",
    newContent:
`function M() {
    let a = [1,2,3];
    let x = 0;
    console.log(/*RENAME*/newFunction(a, x));
}

function newFunction(a: number[], x: number): any {
    return a[x];
}
`
});
