/// <reference path='fourslash.ts' />

//// const /*z*/a/*y*/ = 42;
//// function b (arg: number) { return arg; }
//// b(a);

goTo.select("z", "y");
edit.applyRefactor({
    refactorName: "Inline local",
    actionName: "Inline all",
    actionDescription: "Inline all",
    newContent: `function b (arg: number) { return arg; }
b(42);`
});
