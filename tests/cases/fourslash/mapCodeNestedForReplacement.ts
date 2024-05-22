///<reference path="fourslash.ts"/>

// @Filename: /index.ts
//// function foo() {
////     for (let x = 0; x < 10; x++) [||]{
////         console.log("hello");
////         console.log("you");
////     }
////     return 1;
//// }
////

verify.baselineMapCode([test.ranges()], [
`
for (let x = 0; x < 10; x++) {
  console.log("goodbye");
  console.log("world");
}
`
]);