/// <reference path='fourslash.ts' />

//// const foo = /* H */ `/*x*/H/*y*/EAD ${ /* C0 */ 42 /* C1 */} Span1 ${ /* C2 */ 43 /* C3 */} Span2 ${ /* C4 */ 44 /* C5 */} Span3` /* T */

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert string concatenation or template literal",
    actionName: "Convert to string concatenation",
    actionDescription: "Convert to string concatenation",
    newContent:
`const foo = /* H */ "HEAD " + /* C0 */ 42 /* C1 */ + " Span1 " + /* C2 */ 43 /* C3 */ + " Span2 " + /* C4 */ 44 /* C5 */ + " Span3" /* T */`,
});
