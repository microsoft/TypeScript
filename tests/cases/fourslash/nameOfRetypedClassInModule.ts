/// <reference path="fourslash.ts" />

//// module M {
//// }
//// 
//// module M {
//// 	/*A*/class A {}
////    /*B*/export class B {}
////    class Check { /*check*/constructor(val) {} }
////    export class Check2 { /*check2*/constructor(val) {} }
//// }
//// 

edit.disableFormatting();

verify.quickInfos({
    check: "constructor Check(val: any): Check",
    check2: "constructor M.Check2(val: any): Check2"
});

goTo.marker('A');
edit.deleteAtCaret('class A {}'.length);
edit.insert('class A { constructor(val) {} }');
edit.moveLeft('constructor(val) {} }'.length);
verify.quickInfoIs('constructor A(val: any): A');

goTo.marker('B');
edit.deleteAtCaret('export class B {}'.length);
edit.insert('export class B { constructor(val) {} }');
edit.moveLeft('constructor(val) {} }'.length);
verify.quickInfoIs('constructor M.B(val: any): B');
