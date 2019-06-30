/// <reference path='fourslash.ts' />

//// const foo = /*x*/"/*y*/foobar is" + ( /* C1 */ 42 ) /* C2 */ + /* C3 */ " years old"

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert string concatenation or template literal",
    actionName: "Convert to template literal",
    actionDescription: "Convert to template literal",
    newContent:
"const foo = `foobar is\${/* C1 */ 42 /* C2 */ /* C3 */} years old`",
});
