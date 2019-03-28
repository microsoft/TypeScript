/// <reference path='fourslash.ts' />

//// const foo = /* C0 */ /*x*/"/*y*/foo" + /* C1 */ " is" + /* C2 */ 42 + /* C3 */ " and bar" + /* C4 */ " is" + /* C5 */ 52/* C6 */

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert string concatenation or template literal",
    actionName: "Convert to template literal",
    actionDescription: "Convert to template literal",
    newContent:
"const foo = /* C0 */ `foo is\${ /* C1 */ /* C2 */42 /* C3 */} and bar is\${ /* C4 */ /* C5 */52 /* C6 */}`",
});

