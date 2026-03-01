/// <reference path='fourslash.ts' />

// @noImplicitOverride: true
////abstract class A {
////    abstract m() : void;
////}
////
////class B extends A {
////    // comment
////}

verify.codeFix({
    description: "Implement inherited abstract class",
    newFileContent:
`abstract class A {
    abstract m() : void;
}

class B extends A {
    override m(): void {
        throw new Error("Method not implemented.");
    }
    // comment
}`,
});
