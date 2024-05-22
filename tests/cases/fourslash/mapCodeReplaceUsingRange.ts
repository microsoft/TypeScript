///<reference path="fourslash.ts"/>

// @Filename: /index.ts
//// [|function foo() {
////     return 1;
//// }[||]
//// function bar() {
////     return [|2;|]
//// }|]
////

verify.baselineMapCode([test.ranges()], [
`
function foo() {
    return 3;
}
`
]);
