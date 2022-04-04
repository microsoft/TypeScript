/// <reference path='fourslash.ts' />

////const a = /*x*/`x` + `y` + text + "z"/*y*/;

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert to template string",
    actionName: "Convert to template string",
    actionDescription: ts.Diagnostics.Convert_to_template_string.message,
    newContent: "const a = `xy${text}z`;"
});
