/// <reference path='fourslash.ts' />

//// const /*z*/a/*y*/ = 42;
//// const b = 2 * /*x*/a/*w*/;

goTo.select("x", "w");
edit.applyRefactor({
    refactorName: "Inline local",
    actionName: "Inline here",
    actionDescription: "Inline here",
    newContent: `const b = 2 * 42;`
});
