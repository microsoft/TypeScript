/// <reference path="fourslash.ts" />

// @noUnusedLocals: true
// @noUnusedParameters: true

////function foo() {
////    return { a: 1 };
////}
////[|function bar() {
////    const { a } = foo(),
////           b = 1;
////    return b;
////}|]

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Remove_unused_destructuring_declaration.message,
    newRangeContent:
`function bar() {
    const b = 1;
    foo();
    return b;
}`,
});
