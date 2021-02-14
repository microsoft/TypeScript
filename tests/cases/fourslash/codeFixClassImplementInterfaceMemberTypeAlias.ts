/// <reference path='fourslash.ts' />

////type MyType = [string, number];
////interface I { x: MyType; test(a: MyType): void; }
////class C implements I {}

verify.codeFix({
    description: [ts.Diagnostics.Implement_all_members_of_interface_0.message, "I"],
    index: 1,
    newFileContent:
`type MyType = [string, number];
interface I { x: MyType; test(a: MyType): void; }
class C implements I {
    x: MyType;
    test(a: MyType): void {
        throw new Error("Method not implemented.");
    }
}`,
});
