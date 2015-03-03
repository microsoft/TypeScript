/// <reference path="fourslash.ts"/>

////module /*0*/M {
////    export interface /*1*/I {
////    }
////    var x = 10;
////}
////
////var /*2*/M = {
////    foo: 10,
////    bar: 20
////}
////
////var v: /*3*/M./*4*/I;
////
////var x = /*5*/M;

var c = classification;
verify.semanticClassificationsAre(
    c.moduleName("M", test.marker("0").position),
    c.interfaceName("I", test.marker("1").position),
    c.moduleName("M", test.marker("3").position),
    c.interfaceName("I", test.marker("4").position),
    c.moduleName("M", test.marker("5").position));
