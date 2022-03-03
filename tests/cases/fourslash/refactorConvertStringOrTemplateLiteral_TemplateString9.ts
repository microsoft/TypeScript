/// <reference path='fourslash.ts' />

////const a = 1;
////const b = 1;
////const c = 1;
////const d = 1;
////const d = /*start*/"start" + ` / a start ${a} a end / b start ${b} b end / ` + c + ` / d start ${d} d end / ` + "end"/*end*/;

goTo.select("start", "end");
edit.applyRefactor({
    refactorName: "Convert to template string",
    actionName: "Convert to template string",
    actionDescription: ts.Diagnostics.Convert_to_template_string.message,
    newContent: [
        "const a = 1;",
        "const b = 1;",
        "const c = 1;",
        "const d = 1;",
        "const d = `start / a start ${a} a end / b start ${b} b end / ${c} / d start ${d} d end / end`;"
    ].join("\n")
});
