/// <reference path="fourslash.ts"/>

//// var x = 3;
//// 
//// class Foo {
////     static something() {
////         return { "prop": x/**/ };
////     }
//// }

goTo.marker();
verify.quickInfoIs("number", "", "x");