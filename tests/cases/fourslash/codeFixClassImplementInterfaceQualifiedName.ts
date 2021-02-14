/// <reference path='fourslash.ts' />

////namespace N {
////    export interface I { y: I; }
////}
////class C1 implements N.I {}

verify.codeFix({
    description: [ts.Diagnostics.Implement_all_members_of_interface_0.message, "N.I"],
    index: 1,
    newFileContent:
`namespace N {
    export interface I { y: I; }
}
class C1 implements N.I {
    y: N.I;
}`,
});
