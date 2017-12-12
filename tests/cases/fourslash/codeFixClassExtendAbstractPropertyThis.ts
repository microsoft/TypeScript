/// <reference path='fourslash.ts' />

////abstract class A {
////    abstract x: this;
////}
////
////class C extends A {[| |]}

verify.codeFix({
    description: "Implement inherited abstract class",
    // TODO: GH#18445
    newFileContent:
`abstract class A {
    abstract x: this;
}

class C extends A {\r
    x: this;\r
}`,
});
