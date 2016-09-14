/// <reference path="fourslash.ts"/>

//// var x = 3;
//// 
//// class Foo {
////     static something() {
////         return { "prop": /**/x };
////     }
//// }

verify.quickInfoAt("", "var x: number");
