/// <reference path='fourslash.ts' />

//// const a = a/*1*/;
//// const b = a && b/*2*/;
//// const c = [{ prop: [c/*3*/] }];
//// const d = () => { d/*4*/ };
//// const e = { prop() { e/*5*/ }  };

verify.completions({
    marker: ["1"],
    excludes: ["a"],
    isNewIdentifierLocation: true,
});

verify.completions({
    marker: ["2"],
    excludes: ["b"],
    includes: ["a"],
});

verify.completions({
    marker: ["3"],
    excludes: ["c"],
    includes: ["a", "b"],
    isNewIdentifierLocation: true,
});

verify.completions({
    marker: ["4"],
    includes: ["a", "b", "c", "d"],
});

verify.completions({
    marker: ["5"],
    includes: ["a", "b", "c", "d", "e"],
});
