/// <reference path="fourslash.ts" />

////interface Iterator<T, U> {
////    (value: T, index: any, list: any): U;
////}
////interface WrappedArray<T> {
////    map<U>(iterator: Iterator<T, U>, context?: any): U[];
////}
////interface Underscore {
////    <T>(list: T[]): WrappedArray<T>;
////    map<T, U>(list: T[], iterator: Iterator<T, U>, context?: any): U[];
////}
////declare var _: Underscore;
////var aa: string[];
////var b/*1*/b = _.map(aa, x/*7*/x => xx.length);    // should be number[]
////var c/*2*/c = _(aa).map(x/*8*/x => xx.length);    // should be number[]
////var d/*3*/d = aa.map(xx => x/*9*/x.length);       // should be number[]
////var aaa: any[];
////var b/*4*/bb = _.map(aaa, xx => xx.length); // should be any[]
////var c/*5*/cc = _(aaa).map(xx => xx.length);  // Should not error, should be any[]
////var d/*6*/dd = aaa.map(xx => xx.length);     // should not error, should be any[]

verify.numberOfErrorsInCurrentFile(0);
goTo.marker('1');
verify.quickInfoIs('number[]');

goTo.marker('2');
verify.quickInfoIs('number[]');

goTo.marker('3');
verify.quickInfoIs('number[]');

goTo.marker('4');
verify.quickInfoIs('any[]');

goTo.marker('5');
verify.quickInfoIs('any[]');

goTo.marker('6');
verify.quickInfoIs('any[]');

goTo.marker('7');
verify.quickInfoIs('string');

goTo.marker('8');
verify.quickInfoIs('string');

goTo.marker('9');
verify.quickInfoIs('string');