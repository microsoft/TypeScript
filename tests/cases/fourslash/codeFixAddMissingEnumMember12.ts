/// <reference path='fourslash.ts' />

////const x; // this is x
////
////// this is E
////enum E {
////}
////E.a

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Add_missing_enum_member_0.message, "a"],
    newFileContent: `const x; // this is x

// this is E
enum E {
    a
}
E.a`
});


