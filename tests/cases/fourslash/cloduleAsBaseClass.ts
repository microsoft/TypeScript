/// <reference path='fourslash.ts'/>

////class A {
////    constructor(x: number) { }
////    foo() { }
////    static bar() { }
////}
////
////module A {
////    export var x = 1;
////    export function baz() { }
////}
////
////class D extends A {
////    constructor() {
////        super(1);
////    }
////    foo2() { }
////    static bar2() { }
////}
////
////var d: D;
////d./*1*/
////D./*2*/

// this line triggers a semantic/syntactic error check, remove line when 788570 is fixed
edit.insert('');

diagnostics.setTypingFidelity(TypingFidelity.High);

goTo.marker('1');
verify.completionListContains('foo');
verify.completionListContains('foo2');
verify.not.completionListContains('bar');
verify.not.completionListContains('bar2');
verify.not.completionListContains('baz');
verify.not.completionListContains('x');

edit.insert('foo()');

goTo.marker('2');
verify.not.completionListContains('foo');
verify.not.completionListContains('foo2');
verify.completionListContains('bar');
verify.completionListContains('bar2');
verify.completionListContains('baz');
verify.completionListContains('x');
edit.insert('bar()');

verify.numberOfErrorsInCurrentFile(0);