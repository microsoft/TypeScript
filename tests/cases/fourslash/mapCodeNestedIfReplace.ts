///<reference path="fourslash.ts"/>

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

verify.baselineMapCode([test.ranges()], [
`
if (x === y) {
  console.log("goodbye");
  console.log("world");
}
`
]);