/// <reference path='fourslash.ts' />

////abstract class A {
////    abstract get a(): string;
////    abstract set a(newName: string);
////
////    abstract get b(): number;
////
////    abstract set c(arg: number | string);
////}
////
////class C implements A {}

verify.codeFix({
    description: [ts.Diagnostics.Implement_all_members_of_interface_0.message, "A"],
    index: 1,
    newFileContent:
`abstract class A {
    abstract get a(): string;
    abstract set a(newName: string);

    abstract get b(): number;

    abstract set c(arg: number | string);
}

class C implements A {
    get a(): string {
        throw new Error("Method not implemented.");
    }
    set a(newName: string) {
        throw new Error("Method not implemented.");
    }
    get b(): number {
        throw new Error("Method not implemented.");
    }
    set c(arg: string | number) {
        throw new Error("Method not implemented.");
    }
}`,
});
