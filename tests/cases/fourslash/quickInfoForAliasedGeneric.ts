/// <reference path='fourslash.ts'/>

////module M {
////    export module N {
////        export class C<T> { }
////        export class D { }
////    }
////}
////import d = M.N;
////var /*1*/aa: d.C<number>;
////var /*2*/bb: d.D;

goTo.marker('1');
verify.quickInfoIs('(var) aa: d.C<number>');

goTo.marker('2');
verify.quickInfoIs('(var) bb: d.D');