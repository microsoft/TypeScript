///<reference path="fourslash.ts"/>

// @Filename: /index.ts
//// function foo() {
////     const x: number = 1;
////     const y: number = 2;
////     for (let i = 0; i < 10; i++) [||]{
////         console.log("hello");
////         console.log("you");
////     }
////     return 1;
//// }
////

verify.baselineMapCode([test.ranges()], [
`
for (let j = 0; j < 10; j++) {
  console.log("goodbye");
  console.log("world");
}
`
]);