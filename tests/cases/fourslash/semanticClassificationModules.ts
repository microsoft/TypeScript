/// <reference path="fourslash.ts"/>

////module M {
////    export var v;
////    export interface I {
////    }
////}
////
////var x: M.I = M.v;
////var y = M;

var c = classification;
verify.semanticClassificationsAre(c.moduleName("M"), c.interfaceName("I"), c.moduleName("M"), c.interfaceName("I"), c.moduleName("M"), c.moduleName("M"));