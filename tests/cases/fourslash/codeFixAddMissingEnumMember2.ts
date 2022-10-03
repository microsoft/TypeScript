/// <reference path='fourslash.ts' />

////enum E {
////    a = 1
////}
////E.b

verify.codeFix({
    description: "Add missing enum member 'b'",
    newFileContent: `enum E {
    a = 1,
    b
}
E.b`
});

