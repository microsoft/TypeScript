///<reference path="fourslash.ts"/>

// @Filename: /index.ts
//// function foo() {
////     for (const x of [1, 2, 3]) [||]{
////         console.log("hello");
////         console.log("you");
////     }
////     return 1;
//// }
////

verify.baselineMapCode([test.ranges()], [
`
for (const x of [1, 2, 3]) {
  console.log("goodbye");
  console.log("world");
}
`
]);