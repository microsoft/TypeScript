///<reference path="fourslash.ts"/>

// @Filename: /incomingChanges
//// if (false) {
////     return "hello";
//// }
////
// @Filename: /index.ts
//// class MyClass {
////     x = 1;
////     foo() {
////         return 1;
////     }
////     bar() {
////         if (true)[||] {
////             return 2;
////         }
////     }
////     baz() {
////         return 3;
////     }
//// }
////

verify.baselineMapCode(test.ranges()[0]);