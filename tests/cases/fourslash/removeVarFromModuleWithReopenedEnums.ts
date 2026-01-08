/// <reference path="fourslash.ts" />

//// namespace A {
////     /**/var o;
//// }
//// enum A {
//// }
//// enum A {
//// }
//// namespace A {
////     var p;
//// }

goTo.marker();
edit.deleteAtCaret('var o;'.length);

