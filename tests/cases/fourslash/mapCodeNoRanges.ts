///<reference path="fourslash.ts"/>

// @Filename: /index.ts
//// function foo() {
////     return 1;
//// }
//// function bar() {
////     return 2;
//// }
////

verify.baselineMapCode([[]], [
`
function baz() {
    return 3;
}
`
]);

