/// <reference path='fourslash.ts' />

////const x; // this is x
////
////// this is E
////enum E {
////}
////E.a

verify.codeFix({
    description: "Add missing enum member 'a'",
    newFileContent: `const x; // this is x

// this is E
enum E {
    a
}
E.a`
});


