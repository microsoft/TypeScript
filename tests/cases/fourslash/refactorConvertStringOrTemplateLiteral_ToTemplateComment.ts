/// <reference path='fourslash.ts' />

//// const foo = /* C0 */ /*x*/"/*y*/foobar" /* C1 */ + " is" /* C2 */ + 42 /* C3 */ + "years old" /* C4 */

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert string concatenation or template literal",
    actionName: "Convert to template literal",
    actionDescription: "Convert to template literal",
    newContent:
`const foo = /* C0 */ \`foobar is \${ /* C1 */ /* C2 */ 42 /* C3 */}years old\` /* C4 */`,
});

