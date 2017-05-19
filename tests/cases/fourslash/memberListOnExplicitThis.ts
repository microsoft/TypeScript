/// <reference path='fourslash.ts'/>

////interface Restricted {
////   n: number;
////}
////class C1 implements Restricted {
////   n: number;
////   m: number;
////   f(this: this) {this./*1*/} // test on 'this.'
////   g(this: Restricted) {this./*2*/}
////}
////function f(this: void) {this./*3*/}
////function g(this: Restricted) {this./*4*/}

goTo.marker('1');
verify.completionListContains('f', '(method) C1.f(this: this): void');
verify.completionListContains('g', '(method) C1.g(this: Restricted): void');
verify.completionListContains('n', '(property) C1.n: number');
verify.completionListContains('m', '(property) C1.m: number');

goTo.marker('2');
verify.completionListContains('n', '(property) Restricted.n: number');

goTo.marker('3');
verify.completionListIsEmpty();

goTo.marker('4');
verify.completionListContains('n', '(property) Restricted.n: number');

