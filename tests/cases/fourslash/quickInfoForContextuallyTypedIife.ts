/// <reference path='fourslash.ts' />

////(({ q/*1*/, qq/*2*/ }, x/*3*/, { p/*4*/ }) => {
////    var s: number = q/*5*/;
////    var t: number = qq/*6*/;
////    var u: number = p/*7*/;
////    var v: number = x/*8*/;
////    return q; })({ q: 13, qq: 12 }, 1, { p: 14 });
////((a/*9*/, b/*10*/, c/*11*/) => [a/*12*/,b/*13*/,c/*14*/])("foo", 101, false);

verify.quickInfos({
    1: "var q: number",
    2: "var qq: number",
    3: "(parameter) x: number",
    4: "var p: number",
    5: "var q: number",
    6: "var qq: number",
    7: "var p: number",
    8: "(parameter) x: number",
    9: "(parameter) a: string",
    10: "(parameter) b: number",
    11: "(parameter) c: boolean",
    12: "(parameter) a: string",
    13: "(parameter) b: number",
    14: "(parameter) c: boolean"
});
