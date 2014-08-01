/// <reference path="fourslash.ts" />

//// interface Intersection {
////     dist: number;
//// }
//// /*interfaceGoesHere*/
//// class /*className*/Sphere {
////     constructor(private center) {
////     }
//// }

goTo.marker('className');
verify.quickInfoSymbolNameIs('Sphere');

goTo.marker('interfaceGoesHere');
edit.insert("\r\ninterface Surface {\r\n    reflect: () => number;\r\n}\r\n");

goTo.marker('className');
verify.quickInfoSymbolNameIs('Sphere');
