///<reference path="fourslash.ts"/>

// @Filename: /incomingChanges.ts
//// quux() {
////     return 4;
//// }
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
////     baz() {
////         return 3;
////     }
//// }
////

verify.baselineMapCode(test.ranges()[0], "/incomingChanges.ts");