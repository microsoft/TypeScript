///<reference path="fourslash.ts"/>

// @Filename: /incomingChanges
//// if (foo == bar) {
////     console.log("huh");
//// }
////
//// function baz() {
////     return 'baz';
//// }
////
// @Filename: /index.ts
//// function foo() {
////     return 1;
//// }
//// if (foo == bar) {
////     console.log("hello");
////     console.log("you");
//// }
//// [||]
//// function bar() {
////     return 2;
//// }
//// function baz() {
////     return 3;
//// }
//// while (false) {
////     console.log("weee");
//// }
////

verify.baselineMapCode(test.ranges()[0]);