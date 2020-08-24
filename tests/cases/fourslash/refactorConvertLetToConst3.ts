/// <reference path='fourslash.ts' />

//// /*a*/let a = 1, b = 2;/*b*/

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert 'let' to 'const'",
    actionName: "Convert 'let' to 'const'",
    actionDescription: "Convert 'let' to 'const'",
    newContent: `const a = 1, b = 2;`
});
