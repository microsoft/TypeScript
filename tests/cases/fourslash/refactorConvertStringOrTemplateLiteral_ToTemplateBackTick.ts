/// <reference path='fourslash.ts' />

//// const foo = "/*x*/w/*y*/ith back`tick"

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert to template string",
    actionName: "Convert to template string",
    actionDescription: ts.Diagnostics.Convert_to_template_string.message,
    newContent:
"const foo = `with back\\`tick`",
});
