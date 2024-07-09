/// <reference path='fourslash.ts' />

////class C {
////    static m() { m(); }
////    n() { m(); }
////}

verify.codeFix({
    description: "Add 'C.' to unresolved variable",
    index: 0,
    newFileContent:
`class C {
    static m() { C.m(); }
    n() { m(); }
}`,
    applyChanges: true,
});

verify.codeFix({
    description: "Add 'C.' to unresolved variable",
    newFileContent:
`class C {
    static m() { C.m(); }
    n() { C.m(); }
}`
});
