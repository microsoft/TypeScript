/// <reference path="fourslash.ts"/>

//// module M {
////     export interface I {
////     }
//// }
//// interface X extends M.I { }

debugger;
var c = classification;
verify.semanticClassificationsAre(
    c.moduleName("M"), c.interfaceName("I"), c.interfaceName("X"), c.moduleName("M"), c.interfaceName("I"));
