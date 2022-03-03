/// <reference path="fourslash.ts" />

//// function foo() {
////     bar`a${1}b`;
//// }
////
//// function /**/bar(array: TemplateStringsArray, ...args: any[]) {
////     baz();
//// }
////
//// function baz() {
//// }

goTo.marker();
verify.baselineCallHierarchy();
