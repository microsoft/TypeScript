/// <reference path='fourslash.ts' />

////class C {
////}
////
////function foo() {
////    return C;
////}
////
////foo()!();


verify.codeFix({
    description: "Add missing 'new' operator to call",
    index: 0,
    newFileContent:
`class C {
}

function foo() {
    return C;
}

new (foo()!)();`
});
