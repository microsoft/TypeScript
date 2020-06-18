/// <reference path="fourslash.ts" />

// @filename: main.ts
//// import bar = require("./other");
////
//// function foo() {
////     bar();
//// }

// @filename: other.ts
//// export = /**/function () {
////     baz();
//// }
////
//// function baz() {
//// }

// NOTE: exported function is unnamed, so we expand the item to the entire file...
goTo.marker();
verify.baselineCallHierarchy();
