/// <reference path='fourslash.ts' />

// @experimentalDecorators: true
// @noImplicitOverride: true

////function decorator() {
////    return (target: any, key: any, descriptor: PropertyDescriptor) => descriptor;
////}
////class A {
////    foo() {}
////}
////class B extends A {
////    @decorator()
////    [|public foo() {}|]
////}

verify.codeFix({
    description: "Add 'override' modifier",
    newRangeContent: "public override foo() {}",
    index: 0
})
