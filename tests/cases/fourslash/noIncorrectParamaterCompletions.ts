/// <reference path='fourslash.ts' />

//// f(a = /*1*/, b) { }
//// f(a = a/*2*/, b) { }
//// f(a = a + /*3*/, b) { }

verify.completions({
    marker: ["1", "2"],
    excludes: ["a", "b"],
    isNewIdentifierLocation: true,
})
verify.completions({
    marker: ["3"],
    excludes: ["a", "b"],
    isNewIdentifierLocation: false,
})
