/// <reference path='fourslash.ts' />

////namespace N {
////    export interface I { y: I; }
////}
////class C1 implements N.I {}

verify.codeFix({
    description: "Implement interface 'N.I'",
    newFileContent:
`namespace N {
    export interface I { y: I; }
}
class C1 implements N.I {
    y: N.I;
}`,
});
