/// <reference path='fourslash.ts' />

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
    m(): void {
        throw new Error("Method not implemented.");
    }
    // comment
}`,
});
