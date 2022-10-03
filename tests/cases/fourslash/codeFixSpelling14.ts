/// <reference path='fourslash.ts' />

// @noImplicitOverride: true

////type Foo = abstract new(...args: any) => any;
////declare function CreateMixin<C extends Foo, T extends Foo>(Context: C, Base: T): T & {
////    new (...args: any[]): { context: InstanceType<C> }
////}
////class Context {}
////class A {
////    doSomething() {}
////}
////class B extends CreateMixin(Context, A) {
////    override [|doSomethang|]() {}
////}

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Change_spelling_to_0.message, "doSomething"],
    newRangeContent: "doSomething"
});
