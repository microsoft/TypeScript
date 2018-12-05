/// <reference path='fourslash.ts' />

//// const foo = "/*x*/w/*y*/ait for others\n"
//// + "D'oh!\n"
//// + ""Yada, yada, yada\n"
//// + "Hasta la vista, baby!"

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert string concatenation or template literal",
    actionName: "Convert to template literal",
    actionDescription: "Convert to template literal",
    newContent: 
`const foo = \`wait for others
D'oh!
Yada, yada, yada
Hasta la vista, baby!\``,
});
