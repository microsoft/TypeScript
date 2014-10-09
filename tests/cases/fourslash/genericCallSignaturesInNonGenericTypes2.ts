/// <reference path='fourslash.ts'/>

////interface WrappedArray<T> { }

////interface Underscore {
////    <T>(list: T[]): WrappedArray<T>;
////}

////var _: Underscore;

////var a: number[];

////var /**/b = _(a);  // WrappedArray<any>, should be WrappedArray<number>

goTo.marker();
verify.quickInfoIs('(var) b: WrappedArray<number>');