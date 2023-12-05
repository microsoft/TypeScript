/// <reference path='fourslash.ts' />

////let b = 1;
////let a = '';
////a += /*a*/'foo' + b/*b*/;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to template string",
    actionName: "Convert to template string",
    actionDescription: ts.Diagnostics.Convert_to_template_string.message,
    newContent: [
        "let b = 1;",
        "let a = '';",
        "a += `foo${b}`;"
    ].join("\n")
});
