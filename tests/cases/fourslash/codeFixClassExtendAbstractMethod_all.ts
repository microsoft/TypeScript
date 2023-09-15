/// <reference path='fourslash.ts' />

// @noImplicitOverride: true
////abstract class A {
////    abstract m(): void;
////    abstract n(): void;
////}
////class B extends A {}
////class C extends A {}

verify.codeFixAll({
    fixId: "fixClassDoesntImplementInheritedAbstractMember",
    fixAllDescription: "Implement all inherited abstract classes",
    newFileContent:
`abstract class A {
    abstract m(): void;
    abstract n(): void;
}
class B extends A {
    override m(): void {
        throw new Error("Method not implemented.");
    }
    override n(): void {
        throw new Error("Method not implemented.");
    }
}
class C extends A {
    override m(): void {
        throw new Error("Method not implemented.");
    }
    override n(): void {
        throw new Error("Method not implemented.");
    }
}`,
});
