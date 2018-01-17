/// <reference path='fourslash.ts' />

////abstract class A {
////    abstract m(): void;
////}
////class B extends A {}
////class C extends A {}

verify.codeFixAll({
    fixId: "fixClassDoesntImplementInheritedAbstractMember",
    newFileContent:
`abstract class A {
    abstract m(): void;
}
class B extends A {
    m(): void {
        throw new Error("Method not implemented.");
    }
}
class C extends A {
    m(): void {
        throw new Error("Method not implemented.");
    }
}`,
});
