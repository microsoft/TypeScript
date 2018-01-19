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
edit.insert("\ninterface Surface {\n    reflect: () => number;\n}\n");

verify.quickInfoAt("className", "class Sphere");
