/// <reference path="fourslash.ts"/>

////module /*0*/M {
////    export var v;
////    export interface /*1*/I {
////    }
////}
////
////var x: /*2*/M./*3*/I = /*4*/M.v;
////var y = /*5*/M;

var c = classification;
verify.semanticClassificationsAre(
    c.moduleName("M", test.marker("0").position),
    c.interfaceName("I", test.marker("1").position),
    c.moduleName("M", test.marker("2").position),
    c.interfaceName("I", test.marker("3").position),
    c.moduleName("M", test.marker("4").position),
    c.moduleName("M", test.marker("5").position));