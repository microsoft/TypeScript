/// <reference path='fourslash.ts' />

////const a = /*x*/`${1}`/*y*/ + "a" + "b" + ` ${2}.`;

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert to template string",
    actionName: "Convert to template string",
    actionDescription: ts.Diagnostics.Convert_to_template_string.message,
    newContent: "const a = `${1}ab ${2}.`;"
});
