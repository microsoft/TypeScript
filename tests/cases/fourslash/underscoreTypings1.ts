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
////var b/*1*/ = _.map(a, x/*2*/ => x.length);    // Bug was typed any[], should be number[]
////var c/*3*/ = _(a).map(x/*4*/ => x.length);
////var d/*5*/ = a.map(x/*6*/ => x.length);
////
////var aa: any[];
////var bb/*7*/ = _.map(aa, x/*8*/ => x.length);
////var cc/*9*/ = _(aa).map(x/*10*/ => x.length); 
////var dd/*11*/ = aa.map(x/*12*/ => x.length);     
////
////var e = a.map(x => x./*13*/

goTo.marker('1');
verify.quickInfoIs('number[]');
goTo.marker('2');
verify.quickInfoIs('string');

goTo.marker('3');
verify.quickInfoIs('number[]');
goTo.marker('4');
verify.quickInfoIs('string');

goTo.marker('5');
verify.quickInfoIs('number[]');
goTo.marker('6');
verify.quickInfoIs('string');

goTo.marker('7');
verify.quickInfoIs('any[]');
goTo.marker('8');
verify.quickInfoIs('any');

goTo.marker('9');
verify.quickInfoIs('any[]');
goTo.marker('10');
verify.quickInfoIs('any');

goTo.marker('11');
verify.quickInfoIs('any[]');
goTo.marker('12');
verify.quickInfoIs('any');

goTo.marker('13');
verify.completionListContains('length');
verify.not.completionListContains('toFixed');