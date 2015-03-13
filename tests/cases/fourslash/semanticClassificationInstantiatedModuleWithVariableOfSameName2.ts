/// <reference path="fourslash.ts"/>

////module /*0*/M {
////    export interface /*1*/I {
////    }
////}
////
////module /*2*/M {
////    var x = 10;
////}
////
////var /*3*/M = {
////    foo: 10,
////    bar: 20
////}
////
////var v: /*4*/M./*5*/I;
////
////var x = /*6*/M;

var c = classification;
verify.semanticClassificationsAre(
    c.moduleName("M", test.marker("0").position),
    c.interfaceName("I", test.marker("1").position),
    c.moduleName("M", test.marker("2").position),
    c.moduleName("M", test.marker("4").position),
    c.interfaceName("I", test.marker("5").position),
    c.moduleName("M", test.marker("6").position));
