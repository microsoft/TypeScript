///<reference path="fourslash.ts"/>

// @Filename: /incomingChanges.ts
//// x = 3;
//// bar() {
////     return 'hello';
//// }
//// baz() {
////     return 3;
//// }
//// y = 2;
////
// @Filename: /index.ts
//// class MyClass {[||]
////     x = 1;
////     foo() {
////         return 1;
////     }
////     bar() {
////         return 2;
////     }
//// }
////

verify.baselineMapCode(test.ranges()[0], "/incomingChanges.ts");