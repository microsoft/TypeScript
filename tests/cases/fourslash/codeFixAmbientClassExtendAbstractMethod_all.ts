/// <reference path='fourslash.ts' />

////abstract class A {
////    abstract m(): void;
////    abstract n(): void;
////}
////declare class B extends A {}
////declare class C extends A {}

verify.codeFixAll({
    fixId: "fixClassDoesntImplementInheritedAbstractMember",
    fixAllDescription: "Implement all inherited abstract classes",
    newFileContent:
`abstract class A {
    abstract m(): void;
    abstract n(): void;
}
declare class B extends A {
    m(): void;
    n(): void;
}
declare class C extends A {
    m(): void;
    n(): void;
}`,
});
