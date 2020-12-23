/// <reference path='fourslash.ts' />

//// const a = a/*1*/;
//// const b = a && b/*2*/;
//// const c = [{ prop: [c/*3*/] }];

verify.completions({
    marker: ["1"],
    excludes: ["a"],
    isNewIdentifierLocation: true,
});

verify.completions({
    marker: ["2"],
    excludes: ["b"],
    includes: ["a"],
    isNewIdentifierLocation: false,
});

verify.completions({
    marker: ["3"],
    excludes: ["c"],
    includes: ["a", "b"],
    isNewIdentifierLocation: true,
});
