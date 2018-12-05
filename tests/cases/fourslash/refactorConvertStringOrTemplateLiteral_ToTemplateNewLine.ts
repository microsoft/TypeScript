/// <reference path='fourslash.ts' />

//// const foo = "/*x*/w/*y*/ait for new line\n"
//// + "bada bum!"

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert string concatenation or template literal",
    actionName: "Convert to template literal",
    actionDescription: "Convert to template literal",
    newContent: 
`const foo = \`wait for new line
bada bum!\``,
});
