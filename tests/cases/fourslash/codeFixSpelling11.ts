/// <reference path='fourslash.ts' />

// @noImplicitOverride: true
////abstract class A {
////    abstract doSomething(): void;
////}
////abstract class B extends A {
////    abstract override [|doSomethang|](): number;
////}

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Change_spelling_to_0.message, "doSomething"],
    newRangeContent: "doSomething"
});
