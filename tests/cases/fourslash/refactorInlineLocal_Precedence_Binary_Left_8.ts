/// <reference path='fourslash.ts' />

//// const /*z*/a/*y*/ = -3;
//// const b = /*x*/a/*w*/ ** 9;

goTo.select("z", "y");
edit.applyRefactor({
    refactorName: "Inline local",
    actionName: "Inline all",
    actionDescription: "Inline all",
    newContent: `const b = (-3) ** 9;`
});
