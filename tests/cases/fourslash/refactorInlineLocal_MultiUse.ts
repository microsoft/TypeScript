/// <reference path='fourslash.ts' />

//// const /*z*/a/*y*/ = 42-3;
//// const b = 2 * /*x*/a/*w*/;
//// const c = 2 + a;

goTo.select("z", "y");
edit.applyRefactor({
    refactorName: "Inline local",
    actionName: "Inline all",
    actionDescription: "Inline all",
    newContent: `const b = 2 * (42-3);
const c = 2 + (42-3);
`
});
goTo.select("x", "w");
edit.applyRefactor({
    refactorName: "Inline local",
    actionName: "Inline here",
    actionDescription: "Inline here",
    newContent: `const a = 42-3;
const b = 2 * (42-3);
const c = 2 + a;
`
});
