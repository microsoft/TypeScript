/// <reference path='fourslash.ts' />

// @noImplicitOverride: true
////abstract class A {
////    public abstract x: number;
////}
////
////class C extends A {[| |]}

verify.codeFix({
    description: "Implement inherited abstract class",
    newFileContent:
`abstract class A {
    public abstract x: number;
}

class C extends A {
    public override x: number;
}`,
});
