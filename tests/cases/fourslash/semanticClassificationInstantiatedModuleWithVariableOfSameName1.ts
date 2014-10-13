/// <reference path="fourslash.ts"/>

////module M {
////    export interface I {
////    }
////    var x = 10;
////}
////
////var M = {
////    foo: 10,
////    bar: 20
////}
////
////var v: M.I;
////
////var x = M;

var c = classification;
verify.semanticClassificationsAre(
    c.moduleName("M"), c.interfaceName("I"), c.moduleName("M"), c.interfaceName("I"), c.moduleName("M"));
