/// <reference path="fourslash.ts" />

//// interface Intersection {
////     dist: number;
//// }
//// /*interfaceGoesHere*/
//// class /*className*/Sphere {
////     constructor(private center) {
////     }
//// }

verify.quickInfoAt("className", "class Sphere");

goTo.marker('interfaceGoesHere');
edit.insert("\r\ninterface Surface {\r\n    reflect: () => number;\r\n}\r\n");

verify.quickInfoAt("className", "class Sphere");
