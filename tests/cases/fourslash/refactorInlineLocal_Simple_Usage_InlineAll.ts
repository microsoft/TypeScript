/// <reference path='fourslash.ts' />

//// const /*z*/a/*y*/ = 42 - 3;
//// const b = 2 * /*x*/a/*w*/;

goTo.select("x", "w");
edit.applyRefactor({
    refactorName: "Inline local",
    actionName: "Inline all",
    actionDescription: "Inline all",
    newContent: `const b = 2 * (42 - 3);`
});
