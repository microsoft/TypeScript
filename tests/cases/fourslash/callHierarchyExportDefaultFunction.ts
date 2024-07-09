/// <reference path="fourslash.ts" />

// @filename: main.ts
//// import bar from "./other";
////
//// function foo() {
////     bar();
//// }

// @filename: other.ts
//// export /**/default function () {
////     baz();
//// }
////
//// function baz() {
//// }

goTo.marker();
verify.baselineCallHierarchy();
