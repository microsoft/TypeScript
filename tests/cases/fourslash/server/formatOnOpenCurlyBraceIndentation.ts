/// <reference path="../fourslash.ts"/>

//// if (foo) {
////     if (bar) {/**/}
//// }

goTo.marker("");
format.onType("", "{");
// format.document();
verify.currentFileContentIs(
`if (foo) {
    if (bar) { }
}`);
