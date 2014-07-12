/// <reference path="../fourslash.ts" />

//// interface Iterator<T> {
////     (value: T, index: any): U;
//// }
//// 
//// interface WrappedArray<T> {
////     map<U>(iterator: Iterator<T, U>): U[];
//// }
//// 
//// interface Underscore {
////     <T>(list: T[]): WrappedArray<T>;
////     map<T, U>(list: T[], iterator: Iterator<T, U>, context?: any): U[];
//// }
//// 
//// declare var _: Underscore;
//// 
//// var a: string[];
//// var b = _.map(a, x => x.length);    // Type any[], should be number[]
//// var c = _(a).map();
//// var d = a.map(x => x.length);
//// var bb = _.map(aa, x => x.length);
//// var cc = _(aa).map(x => x.length);  // Error, could not select overload
//// var dd = aa.map(x => x.length);     // Error, could not select overload
//// 
//// 
//// 
//// 

edit.disableFormatting();
diagnostics.validateTypesAtPositions(364);
