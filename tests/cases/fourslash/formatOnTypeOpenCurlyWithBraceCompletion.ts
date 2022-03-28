/// <reference path="fourslash.ts"/>

//// if (foo) {
////     if (bar) {/**/}
//// }

goTo.marker("");
format.onType("", "{");
verify.currentFileContentIs(
`if (foo) {
    if (bar) { }
}`);
