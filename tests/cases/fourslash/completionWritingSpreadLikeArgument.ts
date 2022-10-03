/// <reference path='fourslash.ts'/>

////const t0 = {
////    x: function (./*0*/) {}
////}
////const t1 = {
////    x: (./*1*/) => {}
////}
////const t2 = {
////    x: function foo(./*2*/) => {}
////}
////const t3 = {
////    x(./*3*/) {}
////}
////
////const t4 = function (./*4*/) {}
////const t5 = (./*5*/) => {}
////function t6(./*6*/) {}
////
////class Foo {
////    m(./*7*/) {}
////}

for (const marker of test.markers()) {
    goTo.marker(marker);
    verify.completions({ exact: undefined });

    edit.insert(".");
    verify.completions({ exact: undefined });

    edit.insert(".");
    verify.completions({ exact: undefined });
}
