/// <reference path="fourslash.ts" />

// @Filename: a.ts
/////*1*/function /*2*/decorator(target) {
////    return target;
////}
/////*3*/decorator();

// @Filename: b.ts
////@/*4*/decorator @/*5*/decorator("again")
////class C {
////    @/*6*/decorator
////    method() {}
////}

verify.baselineFindAllReferences('1', '2', '3', '4', '5', '6');
