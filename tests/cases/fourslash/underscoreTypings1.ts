/// <reference path='fourslash.ts'/>

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
////
////var a: string[];
////var /*1*/b = _.map(a, /*2*/x => x.length);    // Was typed any[], should be number[]
////var /*3*/c = _(a).map(/*4*/x => x.length);
////var /*5*/d = a.map(/*6*/x => x.length);
////
////var aa: any[];
////var /*7*/bb = _.map(aa, /*8*/x => x.length);
////var /*9*/cc = _(aa).map(/*10*/x => x.length); 
////var /*11*/dd = aa.map(/*12*/x => x.length);     
////
////var e = a.map(x => x./*13*/

goTo.marker('1');
verify.quickInfoIs('var b: number[]');
goTo.marker('2');
verify.quickInfoIs('(parameter) x: string');

goTo.marker('3');
verify.quickInfoIs('var c: number[]');
goTo.marker('4');
verify.quickInfoIs('(parameter) x: string');

goTo.marker('5');
verify.quickInfoIs('var d: number[]');
goTo.marker('6');
verify.quickInfoIs('(parameter) x: string');

goTo.marker('7');
verify.quickInfoIs('var bb: any[]');
goTo.marker('8');
verify.quickInfoIs('(parameter) x: any');

goTo.marker('9');
verify.quickInfoIs('var cc: any[]');
goTo.marker('10');
verify.quickInfoIs('(parameter) x: any');

goTo.marker('11');
verify.quickInfoIs('var dd: any[]');
goTo.marker('12');
verify.quickInfoIs('(parameter) x: any');

goTo.marker('13');
verify.completionListContains('length');
verify.not.completionListContains('toFixed');