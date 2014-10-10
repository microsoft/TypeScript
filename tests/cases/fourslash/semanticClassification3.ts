/// <reference path="fourslash.ts"/>

////declare module M {
////    interface I {
////
////    }
////}
////
////var M = { I: 10 };

var c = classification;
verify.semanticClassificationsAre(c.moduleName("M"), c.interfaceName("I"), c.moduleName("M"));