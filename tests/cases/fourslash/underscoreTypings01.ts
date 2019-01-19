/// <reference path='fourslash.ts'/>

////interface Iterator_<T, U> {
////    (value: T, index: any, list: any): U;
////}
////
////interface WrappedArray<T> {
////    map<U>(iterator: Iterator_<T, U>, context?: any): U[];
////}
////
////interface Underscore {
////    <T>(list: T[]): WrappedArray<T>;
////    map<T, U>(list: T[], iterator: Iterator_<T, U>, context?: any): U[];
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

verify.quickInfos({
    1: "var b: number[]",
    2: "(parameter) x: string",

    3: "var c: number[]",
    4: "(parameter) x: string",

    5: "var d: number[]",
    6: "(parameter) x: string",

    7: "var bb: any[]",
    8: "(parameter) x: any",

    9: "var cc: any[]",
    10: "(parameter) x: any",

    11: "var dd: any[]",
    12: "(parameter) x: any"
});

verify.completions({ marker: "13", includes: "length", excludes: "toFixed" });
