/// <reference path='fourslash.ts'/>

////module M {
////   export class C1 { }
////   export class C2<T> { }
////}

////var c = new M.C2<number>();

////module N {
////   export class D1 extends M.C1 { }
////   export class D2<T> extends M.C2<T> { }
////}

////var n = new N.D1();
////var n2/*1*/ = new N.D2<number>();
////var n3/*2*/ = new N.D2();

goTo.marker('1');
verify.quickInfoIs('N.D2<number>');

goTo.marker('2')
verify.quickInfoIs('N.D2<{}>');