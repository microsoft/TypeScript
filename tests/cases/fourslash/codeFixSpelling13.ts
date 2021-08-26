/// <reference path='fourslash.ts' />

// @noImplicitOverride: true

////type Foo = abstract new(...args: any) => any;
////declare function CreateMixin<C extends Foo, T extends Foo>(Context: C, Base: T): T & {
////    new (...args: any[]): { context: InstanceType<C> }
////}
////class Context {}
////class A {
////    foo() {}
////}
////class B extends CreateMixin(Context, A) {
////    [|override doSomethang() {}|]
////}

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Remove_override_modifier.message],
    newRangeContent: "doSomethang() {}"
});
