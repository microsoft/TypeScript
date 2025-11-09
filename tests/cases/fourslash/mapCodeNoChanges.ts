///<reference path="fourslash.ts"/>

// @Filename: /index.ts
//// function foo() {
////     return 1;
//// }
//// [||]
//// function bar() {
////     return 2;
//// }
//// function baz() {
////     return 3;
//// }
////

verify.baselineMapCode([test.ranges()], []);
