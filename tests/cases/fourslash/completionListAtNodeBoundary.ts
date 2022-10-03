/// <reference path="fourslash.ts"/>

////interface Iterator<T, U> {
////    (value: T, index: any, list: any): U;
////}
////
////interface WrappedArray<T> {
////    map<U>(iterator: Iterator<T, U>, context?: any): U[];
////}
////
////interface Underscore {
////    <T>(list: T[]): WrappedArray<T>;
////    map<T, U>(list: T[], iterator: Iterator<T, U>, context?: any): U[];
////}
////
////declare var _: Underscore;
////var a: string[];
////var e = a.map(x => x./**/);

verify.completions({ marker: "", includes: "charAt" });
