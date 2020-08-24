/// <reference path='fourslash.ts' />

//// let /*c*/a = 1/*d*/, /*a*/b = 2/*b*/;
//// b = 1;

goTo.select("a", "b");
verify.not.refactorAvailable("Convert 'let' to 'const'");

goTo.select("c", "d");
edit.applyRefactor({
    refactorName: "Convert 'let' to 'const'",
    actionName: "Convert 'let' to 'const'",
    actionDescription: "Convert 'let' to 'const'",
    newContent: `let b = 2;
const a = 1;
b = 1;`
});
