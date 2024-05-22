///<reference path="fourslash.ts"/>

// @Filename: /topLevelInsert.ts
//// function foo() {
////     return 1;
//// }[||]
//// function bar() {
////     return 2;
//// }

verify.baselineMapCode([test.ranges()], [
`
function baz() {
    return 3;
}
`
]);