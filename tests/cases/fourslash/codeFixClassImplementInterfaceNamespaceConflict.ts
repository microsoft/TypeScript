/// <reference path='fourslash.ts' />

////namespace N1 {
////    export interface I1 { x: number; }
////}
////interface I1 {
////    f1();
////}
////class C1 implements N1.I1 {}

verify.codeFix({
    description: [ts.Diagnostics.Implement_all_members_of_interface_0.message, "N1.I1"],
    index: 1,
    newFileContent:
`namespace N1 {
    export interface I1 { x: number; }
}
interface I1 {
    f1();
}
class C1 implements N1.I1 {
    x: number;
}`,
});
