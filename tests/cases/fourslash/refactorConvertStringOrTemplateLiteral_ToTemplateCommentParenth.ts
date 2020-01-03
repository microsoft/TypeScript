/// <reference path='fourslash.ts' />

//// const foo = /*x*/"/*y*/foobar is" + ( /* C1 */ 42 ) /* C2 */ + /* C3 */ " years old"

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert to template string",
    actionName: "Convert to template string",
    actionDescription: ts.Diagnostics.Convert_to_template_string.message,
    newContent:
"const foo = `foobar is\${/* C1 */ 42 /* C2 */ /* C3 */} years old`",
});
