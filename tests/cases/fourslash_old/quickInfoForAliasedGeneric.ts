/// <reference path='fourslash.ts'/>

////module M {
////    export module N {
////        export class C<T> { }
////        export class D { }
////    }
////}
////import d = M.N;
////var aa/*1*/: d.C<number>;
////var bb/*2*/: d.D;

goTo.marker('1');
verify.quickInfoIs('M.N.C<number>');

goTo.marker('2');
verify.quickInfoIs('M.N.D');