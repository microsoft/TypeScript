/// <reference path='fourslash.ts' />

////const a = { prop: 1 };
////const b = /*x*/a["prop"]/*y*/ + "a" + "b";

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert to template string",
    actionName: "Convert to template string",
    actionDescription: ts.Diagnostics.Convert_to_template_string.message,
    newContent: [
        "const a = { prop: 1 };",
        "const b = `${a[\"prop\"]}ab`;"
    ].join("\n")
});
