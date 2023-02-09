/// <reference path='fourslash.ts' />

//// function f1(a = /*1*/, b) { }
//// function f2(a = a/*2*/, b) { }
//// function f3(a = a + /*3*/, b = a/*4*/, c = /*5*/) { }
//// function f3(a) {
////     function f4(b = /*6*/, c) { }
////}

verify.completions({
    marker: ["1", "2"],
    excludes: ["a", "b"],
})
verify.completions({
    marker: ["3"],
    excludes: ["a", "b"],
})

verify.completions({
    marker: ["4"],
    includes: ["a"],
})

verify.completions({
    marker: ["5"],
    includes: ["a", "b"],
})

verify.completions({
    marker: ["6"],
    excludes: ["b", "c"],
    includes: ["a"],
})
