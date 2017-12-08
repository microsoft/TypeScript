/// <reference path='fourslash.ts' />

////abstract class A {
////    protected abstract x: number;
////}
////
////class C extends A {[| |]}

verify.codeFix({
    description: "Implement inherited abstract class",
    // TODO: GH#18445
    newFileContent:
`abstract class A {
    protected abstract x: number;
}

class C extends A {\r
    protected x: number;\r
}`,
});
