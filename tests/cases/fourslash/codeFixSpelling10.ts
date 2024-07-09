/// <reference path='fourslash.ts' />

// @noImplicitOverride: true
////class A {
////    doSomething() {}
////}
////
////class B extends A {
////    override [|doSomethang|]() {}
////}

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Change_spelling_to_0.message, "doSomething"],
    newRangeContent: "doSomething"
});
