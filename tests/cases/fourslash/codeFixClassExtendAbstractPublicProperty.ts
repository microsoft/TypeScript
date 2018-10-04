/// <reference path='fourslash.ts' />

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
    public x: number;
}`,
});
