/// <reference path='fourslash.ts' />

//// const foo = "/*x*/O/*y*/ctal \43";

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert string concatenation or template literal",
    actionName: "Convert to template literal",
    actionDescription: "Convert to template literal",
    newContent:
"const foo = `Octal #`;",
});

