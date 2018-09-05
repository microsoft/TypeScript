/// <reference path='fourslash.ts' />

////enum E {
////}
////E.a

verify.codeFix({
    description: "Add missing enum member 'a'",
    newFileContent: `enum E {
    a
}
E.a`
});


