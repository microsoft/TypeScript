/// <reference path='fourslash.ts' />

////namespace N1 {
////    export interface I1 { x: number; }
////}
////interface I1 {
////    f1();
////}
////class C1 implements N1.I1 {}

verify.codeFix({
    description: "Implement interface 'N1.I1'",
    // TODO: GH#18445
    newFileContent:
`namespace N1 {
    export interface I1 { x: number; }
}
interface I1 {
    f1();
}
class C1 implements N1.I1 {\r
    x: number;\r
}`,
});
