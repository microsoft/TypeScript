/// <reference path="fourslash.ts" />

//// 
//// interface Intersection {
////     /*insertHere*/
//// }
//// interface Scene { }
//// class /*className*/Sphere {
////     constructor() {
////     }
//// }

verify.quickInfoAt("className", "class Sphere");

goTo.marker('insertHere');
edit.insert("ray: Ray;");

verify.quickInfoAt("className", "class Sphere");
