/// <reference path='fourslash.ts' />

////interface I {
////    [x: number]: I;
////}
////class C implements I {}

verify.codeFix({
    description: [ts.Diagnostics.Implement_all_members_of_interface_0.message, "I"],
    index: 1,
    newFileContent:
`interface I {
    [x: number]: I;
}
class C implements I {
    [x: number]: I;
}`,
});
