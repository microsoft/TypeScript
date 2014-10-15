/// <reference path="fourslash.ts"/>

//// interface /*0*/Thing {
////     toExponential(): number;
//// }
//// 
//// var Thing = 0;
//// Thing.toExponential();

var c = classification;
verify.semanticClassificationsAre(c.interfaceName("Thing", test.marker("0").position));