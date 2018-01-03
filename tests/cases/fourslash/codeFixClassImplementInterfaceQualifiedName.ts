/// <reference path='fourslash.ts' />

////namespace N {
////    export interface I { y: I; }
////}
////class C1 implements N.I {}

verify.codeFix({
    description: "Implement interface 'N.I'",
    // TODO: GH#18445
    newFileContent:
`namespace N {
    export interface I { y: I; }
}
class C1 implements N.I {\r
    y: N.I;\r
}`,
});
