/// <reference path="fourslash.ts" />

//// function fn(/* comment! */ /**/a: number, c) { }

goTo.marker();
edit.deleteAtCaret('a: number,'.length);
