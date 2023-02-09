/// <reference path='fourslash.ts' />

//// function f1(a = /*1*/, b) { }
//// function f2(a = a/*2*/, b) { }
//// function f3(a = a + /*3*/, b) { }

verify.completions({
    marker: ["1", "2"],
    excludes: ["a", "b"],
})
verify.completions({
    marker: ["3"],
    excludes: ["a", "b"],
})
