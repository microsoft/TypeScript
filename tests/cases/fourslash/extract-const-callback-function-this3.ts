/// <reference path='fourslash.ts' />

////declare function fWithThis(fn: (this: { a: string }, a: string) => string): void;
////fWithThis(/*a*/function (this: { a: string }, a) { return this.a; }/*b*/);

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "constant_scope_0",
    actionDescription: "Extract to constant in enclosing scope",
    newContent:
`declare function fWithThis(fn: (this: { a: string }, a: string) => string): void;
const newLocal = function(this: { a: string; }, a: string): string { return this.a; };
fWithThis(/*RENAME*/newLocal);`
});
