/// <reference path='fourslash.ts' />

//// let a = 1, /*a*/ { toLowerCase: { call } } /*b*/ = ""

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert 'let' to 'const'",
    actionName: "Convert 'let' to 'const'",
    actionDescription: "Convert 'let' to 'const'",
    newContent: `let a = 1;
const { toLowerCase: { call } } = "";
`
});


