/// <reference path='fourslash.ts' />
// @noImplicitThis: true
////const foo = {
////    num: 0,
////    f() {
////        type Y = typeof th/*1*/is;
////        type Z = typeof th/*2*/is.num;
////    },
////    g(this: number) {
////        type X = typeof th/*3*/is;
////    }
////}
////class Foo {
////    num = 0;
////    f() {
////        type Y = typeof th/*4*/is;
////        type Z = typeof th/*5*/is.num;
////    }
////    g(this: number) {
////        type X = typeof th/*6*/is;
////    }
////}

verify.baselineQuickInfo();
