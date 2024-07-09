/// <reference path="fourslash.ts" />

// @jsx: preserve
// @filename: main.tsx
//// function foo() {
////     return <Bar/>;
//// }
////
//// function /**/Bar() {
////     baz();
//// }
////
//// function baz() {
//// }

goTo.marker();
verify.baselineCallHierarchy();
