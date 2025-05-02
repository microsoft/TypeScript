/// <reference path='fourslash.ts' />

// @noImplicitOverride: true
////abstract class A {
////    abstract x: number;
////    abstract y: this;
////    abstract z: A;
////}
////
////class C extends A {}

verify.codeFix({
    description: "Implement inherited abstract class",
    newFileContent:
`abstract class A {
    abstract x: number;
    abstract y: this;
    abstract z: A;
}

class C extends A {
    override x: number;
    override y: this;
    override z: A;
}`
});
