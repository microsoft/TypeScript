///<reference path="fourslash.ts"/>

// @Filename: /index.ts
//// function foo() {
////     const x: number = 1;
////     const y: number = 2;
////     myLabel: if (x === y) [||]{
////         console.log("hello");
////         console.log("you");
////         break myLabel;
////     }
////     return 1;
//// }
////

verify.baselineMapCode([test.ranges()], [
`
otherLabel: if (y === x) {
  console.log("goodbye");
  console.log("world");
  break otherLabel;
}
`
]);