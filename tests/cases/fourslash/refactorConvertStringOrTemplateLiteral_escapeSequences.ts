/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////let s = /*a1*/"\0\b\f\t\r\n" + text + "\n"/*a2*/;

goTo.select("a1", "a2");
edit.applyRefactor({
    refactorName: "Convert to template string",
    actionName: "Convert to template string",
    actionDescription: ts.Diagnostics.Convert_to_template_string.message,
    newContent: 'let s = `\\0\\b\\f\\t\\r\\n${text}\\n`;'
});

// @Filename: /b.ts
////let s = /*b1*/'"' + text + "'"/*b2*/;

goTo.select("b1", "b2");
edit.applyRefactor({
    refactorName: "Convert to template string",
    actionName: "Convert to template string",
    actionDescription: ts.Diagnostics.Convert_to_template_string.message,
    // newContent is: let s = `"${text}'`;
    newContent: 'let s = `"${text}\'`;'
});

// @Filename: /c.ts
////let s = /*c1*/'$' + text + "\\"/*c2*/;

goTo.select("c1", "c2");
edit.applyRefactor({
    refactorName: "Convert to template string",
    actionName: "Convert to template string",
    actionDescription: ts.Diagnostics.Convert_to_template_string.message,
    // newContent is: let s = `\$${text}\\`;
    newContent: 'let s = `\\$${text}\\\\`;'
});

// @Filename: /d.ts
////let s = /*d1*/`$` + text + `\\`/*d2*/;

goTo.select("d1", "d2");
edit.applyRefactor({
    refactorName: "Convert to template string",
    actionName: "Convert to template string",
    actionDescription: ts.Diagnostics.Convert_to_template_string.message,
    // newContent is: let s = `\$${text}\\`;
    newContent: 'let s = `\\$${text}\\\\`;'
});

// @Filename: /e.ts
////let s = /*e1*/'${' + text + "}"/*e2*/;

goTo.select("e1", "e2");
edit.applyRefactor({
    refactorName: "Convert to template string",
    actionName: "Convert to template string",
    actionDescription: ts.Diagnostics.Convert_to_template_string.message,
    // newContent is: let s = `\${${text}}`;
    newContent: 'let s = `\\${${text}}`;'
});

// @Filename: /f.ts
////let s = /*f1*/`\${` + text + `}`/*f2*/;

goTo.select("f1", "f2");
edit.applyRefactor({
    refactorName: "Convert to template string",
    actionName: "Convert to template string",
    actionDescription: ts.Diagnostics.Convert_to_template_string.message,
    // newContent is: let s = `\${${text}}`;
    newContent: 'let s = `\\${${text}}`;'
});

// @Filename: /g.ts
////let s = /*g1*/'\\$' + text + "\\"/*g2*/;

goTo.select("g1", "g2");
edit.applyRefactor({
    refactorName: "Convert to template string",
    actionName: "Convert to template string",
    actionDescription: ts.Diagnostics.Convert_to_template_string.message,
    // newContent is: let s = `\\\$${text}\\`;
    newContent: 'let s = `\\\\\\$${text}\\\\`;'
});

// @Filename: /h.ts
////let s = /*h1*/"\u0041\u0061" + text + "\0\u0000"/*h2*/;

goTo.select("h1", "h2");
edit.applyRefactor({
    refactorName: "Convert to template string",
    actionName: "Convert to template string",
    actionDescription: ts.Diagnostics.Convert_to_template_string.message,
    // newContent is: let s = `\u0041\u0061${text}\0\u0000`;
    newContent: 'let s = `\\u0041\\u0061${text}\\0\\u0000`;'
});
