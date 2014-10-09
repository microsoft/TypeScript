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

goTo.marker('className');
verify.quickInfoIs('class Sphere');

goTo.marker('insertHere');
edit.insert("ray: Ray;");

goTo.marker('className');

verify.quickInfoIs('class Sphere');