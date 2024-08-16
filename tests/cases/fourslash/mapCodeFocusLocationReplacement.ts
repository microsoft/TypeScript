///<reference path="fourslash.ts"/>

// @Filename: /index.ts
//// function foo() {
////     const x: number = 1;
////     const y: number = 2;
////     if (x === y) {
////         console.log("hello");
////         console.log("world");
////     }
////     return 1;
//// }
//// function bar() {
////     const x: number = 1;
////     const y: number = 2;
////     if (x === y)[||] {
////         console.log("x");
////         console.log("y");
////     }
////     return 2;
//// }
//// function baz() {
////     const x: number = 1;
////     const y: number = 2;
////     if (x === y) {
////         console.log(x);
////         console.log(y);
////     }
////     return 3;
//// }
////

verify.baselineMapCode([test.ranges()], [
`
if (x === y) {
    return x + y;
}
`
]);