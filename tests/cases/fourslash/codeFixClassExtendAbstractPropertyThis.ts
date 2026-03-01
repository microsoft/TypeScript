/// <reference path='fourslash.ts' />

// @noImplicitOverride: true
////abstract class A {
////    abstract x: this;
////}
////
////class C extends A {[| |]}

verify.codeFix({
    description: "Implement inherited abstract class",
    newFileContent:
`abstract class A {
    abstract x: this;
}

class C extends A {
    override x: this;
}`,
});
