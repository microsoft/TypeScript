/// <reference path="fourslash.ts" />

//// foo();
//// function /**/foo() {
//// }

goTo.marker();
verify.baselineCallHierarchy();
