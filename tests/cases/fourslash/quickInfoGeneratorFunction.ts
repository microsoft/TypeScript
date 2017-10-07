/// <reference path='fourslash.ts' />

// @target: esnext

////function* f() {}
/////*f*/f;
////class C {
////    *m() {}
////}
////new C()./*m*/m();

verify.quickInfoAt("f", "function* f(): {}");
verify.quickInfoAt("m", "(method)* C.m(): {}");
