/// <reference path='fourslash.ts' />

debugger;
//// const foo = "/*x*/U/*y*/nicode \u0023 \u{0023} " + "Hex \x23 " + "Octal \43";

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert string concatenation or template literal",
    actionName: "Convert to template literal",
    actionDescription: "Convert to template literal",
    newContent:
"const foo = `Unicode # # Hex # Octal #\`;",
});
