/// <reference path='fourslash.ts' />

// @noImplicitOverride: true
////abstract class A {
////    protected abstract x: number;
////}
////
////class C extends A {[| |]}

verify.codeFix({
    description: "Implement inherited abstract class",
    newFileContent:
`abstract class A {
    protected abstract x: number;
}

class C extends A {
    protected override x: number;
}`,
});
