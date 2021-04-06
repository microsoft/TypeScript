/// <reference path='fourslash.ts' />

////const a = 1;
////const b = 1;
////const c = 1;
////const d = 1;
////const d = `a${/* a */ a /* a */} ${b}` + /*start*/" other "/*end*/ + c + `${/* d */ d /* d */}`;

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
        "const d = `a${/* a */ a /* a */} ${b} other ${c}${/* d */ d /* d */}`;"
    ].join("\n")
});
