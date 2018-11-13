/// <reference path='fourslash.ts' />

////enum E {
////    a = "b"
////}
////E.b

verify.codeFix({
    description: "Add missing enum member 'b'",
    newFileContent: `enum E {
    a = "b",
    b = "b"
}
E.b`
});


