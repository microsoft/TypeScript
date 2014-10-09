/// <reference path='fourslash.ts'/>

////interface WrappedObject<T> { }

////interface WrappedArray<T> { }

////interface Underscore {
////    <T>(list: T[]): WrappedArray<T>;
////    <T>(obj: T): WrappedObject<T>;
////}

////var _: Underscore;

////var a: number[];

////var /**/b = _(a); 

goTo.marker();
verify.quickInfoIs('(var) b: WrappedArray<number>');
