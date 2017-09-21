/// <reference path='fourslash.ts' />

////foo({
////    /**/f: function() {},
////    f() {}
////});

// The symbol indicates that this is a function, but the type is `any`.
// Regression test that we don't crash (by trying to get signatures from `any`).
verify.quickInfoAt("", "(method) f(): void");
