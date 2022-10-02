/// <reference path='fourslash.ts' />

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
