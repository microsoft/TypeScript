/// <reference path='fourslash.ts' />

//// const a = a/*1*/;
//// const b = a && b/*2*/;
//// const c = [{ prop: [c/*3*/] }];
//// const d = () => { d/*4*/ };
//// const e = () => expression/*5*/
//// const f = { prop() { e/*6*/ }  };
//// const fn = (p = /*7*/) => {}
//// const { g, h = /*8*/ } = { ... }
//// const [ g1, h1 = /*9*/ ] = [ ... ]
//// const { a1 } = a/*10*/;
//// const { a2 } = fn({a: a/*11*/});
//// const [ a3 ] = a/*12*/;
//// const [ a4 ] = fn([a/*13*/]);

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

verify.completions({
    marker: ["6"],
    includes: ["a", "b", "c", "d", "e"],
});

verify.completions({
    marker: ["7"],
    includes: ["a", "b", "c", "d", "e", "fn"],
});

verify.completions({
    marker: ["8"],
    includes: ["a", "b", "c", "d", "e", "fn"],
});

verify.completions({
    marker: ["9"],
    includes: ["a", "b", "c", "d", "e", "fn"],
});

verify.completions({
    marker: ["10"],
    excludes: ["a1"],
    isNewIdentifierLocation: true,
});

verify.completions({
    marker: ["11"],
    excludes: ["a2"],
});

verify.completions({
    marker: ["12"],
    excludes: ["a3"],
    isNewIdentifierLocation: true,
});

verify.completions({
    marker: ["13"],
    excludes: ["a4"],
    isNewIdentifierLocation: true,
});
