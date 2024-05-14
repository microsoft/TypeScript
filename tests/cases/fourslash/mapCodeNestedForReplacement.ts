///<reference path="fourslash.ts"/>

// @Filename: /incomingChanges.ts
//// for (let x = 0; x < 10; x++) {
////   console.log("goodbye");
////   console.log("world");
//// }
////
// @Filename: /index.ts
//// function foo() {
////     for (let x = 0; x < 10; x++) [||]{
////         console.log("hello");
////         console.log("you");
////     }
////     return 1;
//// }
////

verify.baselineMapCode(test.ranges()[0], "/incomingChanges.ts");