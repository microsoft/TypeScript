/// <reference path="fourslash.ts" />

//// namespace M {
//// export class C1 { }
////     /*1*/export interface I { n: number; }
//// }
//// namespace M {
//// function f(): I { return null; } }
//// 

edit.disableFormatting();

goTo.marker("1");

edit.deleteAtCaret(6);
