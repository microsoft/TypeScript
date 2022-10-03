/// <reference path="fourslash.ts" />

//// /**/interface A { a: string; }
//// interface G<T, U> { }
//// var v1: G<A, C>;

goTo.marker();
edit.deleteAtCaret('interface A { a: string; }'.length);
