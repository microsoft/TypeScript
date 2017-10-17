/// <reference path='fourslash.ts' />

//// export {}; // Make this a module
//// (x => x)(/*1*/x => x/*2*/)(1);

goTo.select('1', '2');
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: 'function_scope_0',
    actionDescription: "Extract to function in module scope",
    newContent:
`export {}; // Make this a module
(x => x)(/*RENAME*/newFunction())(1);

function newFunction(): (x: any) => any {
    return x => x;
}
`
});
