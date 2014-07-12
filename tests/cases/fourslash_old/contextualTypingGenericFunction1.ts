/// <reference path='fourslash.ts'/>

// should not contextually type the RHS because it introduces type parameters
////var obj: { f<T>(x: T): T } = { f: <S>(x/*1*/) => x };
////var obj2: <T>(x: T) => T = <S>(x/*2*/) => x;
////
////class C<T> {
////    obj: <T>(x: T) => T
////}
////var c = new C();
////c.obj = <S>(x/*3*/) => x;

goTo.marker('1');
verify.quickInfoIs('any');

goTo.marker('2');
verify.quickInfoIs('any');

goTo.marker('3');
verify.quickInfoIs('any');