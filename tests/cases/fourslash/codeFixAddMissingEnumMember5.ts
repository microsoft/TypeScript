/// <reference path='fourslash.ts' />

////enum E {
////    a = "a" + "-",
////}
////E.b

verify.codeFix({
    description: "Add missing enum member 'b'",
    newFileContent: `enum E {
    a = "a" + "-",
    b = "b",
}
E.b`
});


