/// <reference path='fourslash.ts' />

// Repro https://github.com/Microsoft/TypeScript/issues/19395

// @Filename: test.ts
//// export const b = 2;
//// interface Interface { }
////
//// async function handle(i: Interface) {
////     /*a*/const x = 3, y = i;/*b*/
//// }
// @Filename: library.d.ts
//// export as namespace NS;
//// export const a = 1;


goTo.select('a', 'b')
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_1",
    actionDescription: "Extract to function in module scope",
    newContent:
`export const b = 2;
interface Interface { }

async function handle(i: Interface) {
    /*RENAME*/newFunction(i);
}

function newFunction(i: Interface) {
    const x = 3, y = i;
}
`
});
