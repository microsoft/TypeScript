/// <reference path='fourslash.ts' />

////interface I {
////    x: number;
////    y?: number;
////}
////class C implements I {}

verify.codeFix({
    description: [ts.Diagnostics.Implement_required_members_of_interface_0.message, "I"],
    index: 0,
    newFileContent:
`interface I {
    x: number;
    y?: number;
}
class C implements I {
    x: number;
}`,
});
