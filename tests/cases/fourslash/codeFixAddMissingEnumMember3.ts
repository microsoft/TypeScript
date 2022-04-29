/// <reference path='fourslash.ts' />

////enum E {
////    a,
////    b = 1,
////    c
////}
////E.d

verify.codeFix({
    description: "Add missing enum member 'd'",
    newFileContent: `enum E {
    a,
    b = 1,
    c,
    d
}
E.d`
});


