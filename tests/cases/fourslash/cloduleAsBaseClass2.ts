/// <reference path='fourslash.ts'/>

// @Filename: cloduleAsBaseClass2_0.ts
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
////export = A;

// @Filename: cloduleAsBaseClass2_1.ts
////import B = require('./cloduleAsBaseClass2_0');
////class D extends B {
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

verify.noErrors();
