/// <reference path='fourslash.ts' />

//// const foo = /* C0 */ /*x*/"/*y*/foo" /* C1 */ + " is" /* C2 */ + 42 + " years old"/* C3 */

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert to template string",
    actionName: "Convert to template string",
    actionDescription: ts.Diagnostics.Convert_to_template_string.message,
    newContent:
"const foo = /* C0 */ `foo is\${ /* C1 */ /* C2 */42} years old` /* C3 */",
});
