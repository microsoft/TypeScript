///<reference path="fourslash.ts"/>

// @Filename: /incomingChanges
//// if (y === x) {
////   console.log("goodbye");
////   console.log("world");
//// }
////
// @Filename: /index.ts
//// function foo() {
////     const x: number = 1;
////     const y: number = 2;
////     if (x === y) [||]{
////         console.log("hello");
////         console.log("you");
////     }
////     return 1;
//// }
////

verify.baselineMapCode(test.ranges()[0]);