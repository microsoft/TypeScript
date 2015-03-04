/// <reference path="fourslash.ts"/>

////declare module /*0*/M {
////    interface /*1*/I {
////
////    }
////}
////
////var M = { I: 10 };

var c = classification;
verify.semanticClassificationsAre(
    c.moduleName("M", test.marker("0").position),
    c.interfaceName("I", test.marker("1").position));