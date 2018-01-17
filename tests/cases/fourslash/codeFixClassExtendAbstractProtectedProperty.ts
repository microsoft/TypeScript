/// <reference path='fourslash.ts' />

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
    protected x: number;
}`,
});
