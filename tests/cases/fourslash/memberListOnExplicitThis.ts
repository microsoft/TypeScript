// @strictThis: true
/// <reference path='fourslash.ts'/>

////interface Restricted {
////   n: number;
////}
////class C1 implements Restricted {
////   n: number;
////   m: number;
////   f() {this./*1*/} // test on 'this.'
////   g(this: Restricted) {this./*2*/}
////}
////function f() {this./*3*/}
////function g(this: Restricted) {this./*4*/}

goTo.marker('1');
verify.memberListContains('f', '(method) C1.f(this: this): void');
verify.memberListContains('g', '(method) C1.g(this: Restricted): void');
verify.memberListContains('n', '(property) C1.n: number');
verify.memberListContains('m', '(property) C1.m: number');

goTo.marker('2');
verify.memberListContains('n', '(property) Restricted.n: number');

goTo.marker('3');
verify.memberListIsEmpty();

goTo.marker('4');
verify.memberListContains('n', '(property) Restricted.n: number');

