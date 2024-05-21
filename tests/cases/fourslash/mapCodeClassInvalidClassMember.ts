///<reference path="fourslash.ts"/>

// @Filename: /incomingChanges.ts
//// if (false) {
////     return "hello";
//// }
////
// @Filename: /index.ts
//// class MyClass {[||]
//// }
////

verify.baselineMapCode(test.ranges(), "/incomingChanges.ts");