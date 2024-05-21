///<reference path="fourslash.ts"/>

// @Filename: /incomingChanges.ts
//// while (y === x) {
////   console.log("goodbye");
////   console.log("world");
//// }
////
// @Filename: /index.ts
//// function foo() {
////     const x: number = 1;
////     const y: number = 2;
////     while (x === y) [||]{
////         console.log("hello");
////         console.log("you");
////     }
////     return 1;
//// }
////

verify.baselineMapCode(test.ranges(), "/incomingChanges.ts");