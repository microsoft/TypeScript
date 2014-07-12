/// <reference path='fourslash.ts'/>

////class Collection<T> {
////    public add(x: T) { }

////}
////interface Utils {
////    fold<T, S>(c: Collection<T>, folder: (s: S, t: T) => T, init?: S): T;
////}
////var c = new Collection<string>();
////var utils: Utils;
////var r/*1*/ = utils.fold(c, (s, t) => t, "");
////var r2/*2*/ = utils.fold(c, (s, t) => t);

goTo.marker('1');
verify.quickInfoIs('string');

goTo.marker('2');
verify.quickInfoIs('string');