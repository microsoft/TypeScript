/// <reference path="fourslash.ts" />

// @filename: main.ts
//// import Bar from "./other";
////
//// function foo() {
////     new Bar();
//// }

// @filename: other.ts
//// export /**/default class {
////     constructor() {
////         baz();
////     }
//// }
////
//// function baz() {
//// }

goTo.marker();
verify.baselineCallHierarchy();
