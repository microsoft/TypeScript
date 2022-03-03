/// <reference path='fourslash.ts' />

////const foo = /*start*/`` + ""/*end*/;

goTo.select("start", "end");
edit.applyRefactor({
    refactorName: "Convert to template string",
    actionName: "Convert to template string",
    actionDescription: ts.Diagnostics.Convert_to_template_string.message,
    newContent: "const foo = ``;"
});
