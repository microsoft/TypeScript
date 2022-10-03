/// <reference path='fourslash.ts' />

// @noImplicitOverride: true
// @allowJs: true
// @checkJs: true

// @Filename: a.js
////class A {
////    doSomething() {}
////}
////class B extends A {
////    /** @override */
////    [|doSomethang|]() {}
////}

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Change_spelling_to_0.message, "doSomething"],
    newRangeContent: "doSomething"
});
