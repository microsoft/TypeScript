/// <reference path='fourslash.ts' />

//// const foo = "/*x*/w/*y*/ith back`tick"

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert string concatenation or template literal",
    actionName: "Convert to template literal",
    actionDescription: "Convert to template literal",
    newContent:
"const foo = `with back\\`tick`",
});
