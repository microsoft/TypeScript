/// <reference path="fourslash.ts" />

//// /**/
//// module A {
////     export var X;
////     import Z = A.X;
////     var v: Z;
//// }

goTo.marker();
// Used to crash here
edit.insert(' ');
