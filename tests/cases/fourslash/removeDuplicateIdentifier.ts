/// <reference path="fourslash.ts" />

////class foo{}
////function foo() { return null; }

goTo.bof();
edit.deleteAtCaret("class foo{}".length);
