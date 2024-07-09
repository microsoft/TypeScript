/// <reference path='fourslash.ts' />

////abstract class A {
////    abstract f(): this;
////}
////
////class C extends A {}

verify.codeFix({
    description: "Implement inherited abstract class",
    newFileContent:
`abstract class A {
    abstract f(): this;
}

class C extends A {
    f(): this {
        throw new Error("Method not implemented.");
    }
}`
});
