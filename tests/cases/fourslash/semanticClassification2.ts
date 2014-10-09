/// <reference path="fourslash.ts"/>

//// interface Thing {
////     toExponential(): number;
//// }
//// 
//// var Thing = 0;
//// Thing.toExponential();

var c = classification;
// NOTE: this is *wrong*, but will be fixed shortly.
verify.semanticClassificationsAre(c.interfaceName("Thing"), c.interfaceName("Thing"), c.interfaceName("Thing"));