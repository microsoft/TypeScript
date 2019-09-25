/// <reference path='fourslash.ts' />


////function fWithRest(fn: (...a: number[]) => number) { }
////fWithRest(/*a*/(a, b, c) => a + b + c/*b*/);


goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "constant_scope_0",
    actionDescription: "Extract to constant in enclosing scope",
    newContent:
`function fWithRest(fn: (...a: number[]) => number) { }
const newLocal = (a: number, b: number, c: number): number => a + b + c;
fWithRest(/*RENAME*/newLocal);`
});

