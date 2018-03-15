/// <reference path='fourslash.ts' />

////abstract class A {
////    abstract m(): void;
////    abstract n(): void;
////}
////class B extends A {}
////class C extends A {}

verify.codeFixAll({
    fixId: "fixClassDoesntImplementInheritedAbstractMember",
    fixAllDescription: "Fix all like: Implement inherited abstract class",
    newFileContent:
`abstract class A {
    abstract m(): void;
    abstract n(): void;
}
class B extends A {
    m(): void {
        throw new Error("Method not implemented.");
    }
    n(): void {
        throw new Error("Method not implemented.");
    }
}
class C extends A {
    m(): void {
        throw new Error("Method not implemented.");
    }
    n(): void {
        throw new Error("Method not implemented.");
    }
}`,
});
