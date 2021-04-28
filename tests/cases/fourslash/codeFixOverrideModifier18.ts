/// <reference path='fourslash.ts' />

// @noImplicitOverride: true

////class A {
////    static foo() {}
////}
////class B extends A {
////    [|static foo() {}|]
////}

verify.not.codeFixAvailable("fixAddOverrideModifier");
