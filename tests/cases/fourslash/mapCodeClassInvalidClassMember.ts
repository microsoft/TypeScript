///<reference path="fourslash.ts"/>

// @Filename: /incomingChanges
//// if (false) {
////     return "hello";
//// }
////
// @Filename: /index.ts
//// class MyClass {[||]
//// }
////

verify.baselineMapCode(test.ranges()[0]);