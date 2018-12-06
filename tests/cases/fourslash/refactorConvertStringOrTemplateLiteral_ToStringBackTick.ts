/// <reference path='fourslash.ts' />

//// const foo = `/*x*/w/*y*/ith back\`tick`

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert string concatenation or template literal",
    actionName: "Convert to string concatenation",
    actionDescription: "Convert to string concatenation",
    newContent:
"const foo = \"with back`tick\"",
});
