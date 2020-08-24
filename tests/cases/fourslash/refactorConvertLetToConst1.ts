/// <reference path='fourslash.ts' />

//// let /*a*/a/*b*/ = 1;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert 'let' to 'const'",
    actionName: "Convert 'let' to 'const'",
    actionDescription: "Convert 'let' to 'const'",
    newContent: `const a = 1;`
});
