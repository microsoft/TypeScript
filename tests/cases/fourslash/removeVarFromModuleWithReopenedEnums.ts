/// <reference path="fourslash.ts" />

//// module A {
////     /**/var o;
//// }
//// enum A {
//// }
//// enum A {
//// }
//// module A {
////     var p;
//// }

goTo.marker();
edit.deleteAtCaret('var o;'.length);

