///<reference path="fourslash.ts"/>

// @Filename: /incomingChanges.ts
//// baz() {
////     return 3;
//// }
////
// @Filename: /index.ts
//// function foo() {
////     return 1;
//// }[||]
//// function bar() {
////     return 2;
//// }

verify.baselineMapCode(test.ranges(), "/incomingChanges.ts");
