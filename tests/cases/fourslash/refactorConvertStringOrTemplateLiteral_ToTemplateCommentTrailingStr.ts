/// <reference path='fourslash.ts' />

//// const foo = /* C0 */ /*x*/"/*y*/foo" /* C1 */ + " is" /* C2 */ + 42 + " years old"/* C3 */

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert string concatenation or template literal",
    actionName: "Convert to template literal",
    actionDescription: "Convert to template literal",
    newContent:
"const foo = /* C0 */ `foo is\${ /* C1 */ /* C2 */42} years old` /* C3 */",
});

