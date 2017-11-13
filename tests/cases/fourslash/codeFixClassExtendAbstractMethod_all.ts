/// <reference path='fourslash.ts' />

////abstract class A {
////    abstract m(): void;
////}
////class B extends A {}
////class C extends A {}

verify.codeFixAll({
    groupId: "fixClassDoesntImplementInheritedAbstractMember",
    // TODO: GH#20073 GH#18445
    newFileContent:
`abstract class A {
    abstract m(): void;
}
class B extends A {m(): void {\r
    throw new Error("Method not implemented.");\r
}\r
}
class C extends A {m(): void {\r
    throw new Error("Method not implemented.");\r
}\r
}`,
});
