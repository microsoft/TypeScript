/// <reference path='fourslash.ts' />

////interface I {
////    f<T extends number>(x: T): T;
////}
////class C implements I {}

verify.codeFix({
    description: [ts.Diagnostics.Implement_all_members_of_interface_0.message, "I"],
    index: 1,
    newFileContent:
`interface I {
    f<T extends number>(x: T): T;
}
class C implements I {
    f<T extends number>(x: T): T {
        throw new Error("Method not implemented.");
    }
}`,
});
