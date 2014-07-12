/// <reference path="fourslash.ts" />

//// module M {
//// }
//// 
//// module M {
//// 	/*A*/class A {}
////    /*B*/export class B {}
////    class Check { constructor/*check*/(val) {} }
////    export class Check2 { constructor/*check2*/(val) {} }
//// }
//// 

edit.disableFormatting();

goTo.marker('check');
verify.quickInfoSymbolNameIs('Check');

goTo.marker('check2');
verify.quickInfoSymbolNameIs('M.Check2');

goTo.marker('A');
edit.deleteAtCaret('class A {}'.length);
edit.insert('class A { constructor(val) {} }');
edit.moveLeft('(val) {} }'.length);
verify.quickInfoSymbolNameIs('A');

goTo.marker('B');
edit.deleteAtCaret('export class B {}'.length);
edit.insert('export class B { constructor(val) {} }');
edit.moveLeft('(val) {} }'.length);
verify.quickInfoSymbolNameIs('M.B');
