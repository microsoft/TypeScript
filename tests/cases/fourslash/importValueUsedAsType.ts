/// <reference path="fourslash.ts" />

//// /**/
//// module A {
////     export var X;
////     import Z = A.X;
////     var v: Z;
//// }

goTo.marker();
// Bug 857590: Crash here
// edit.insert(' ');
