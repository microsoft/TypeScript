/// <reference path='fourslash.ts' />

////declare function foo(cb: (this: any, x: number, y: string, z: boolean) => void): void;
////
////foo(function(this, a, ...args) {
////    a/*10*/;
////    args/*11*/;
////});
////
////foo(function(this, a, b, ...args) {
////    a/*20*/;
////    b/*21*/;
////    args/*22*/;
////});
////
////foo(function(this, a, b, c, ...args) {
////    a/*30*/;
////    b/*31*/;
////    c/*32*/;
////    args/*33*/;
////});
////
////foo(function(a, ...args) {
////    a/*40*/;
////    args/*41*/;
////});
////
////foo(function(a, b, ...args) {
////    a/*50*/;
////    b/*51*/;
////    args/*52*/;
////});
////
////foo(function(a, b, c, ...args) {
////    a/*60*/;
////    b/*61*/;
////    c/*62*/;
////    args/*63*/;
////});

verify.quickInfos({
    10: "(parameter) a: number",
    11: "(parameter) args: [y: string, z: boolean]",
    20: "(parameter) a: number",
    21: "(parameter) b: string",
    22: "(parameter) args: [z: boolean]",
    30: "(parameter) a: number",
    31: "(parameter) b: string",
    32: "(parameter) c: boolean",
    33: "(parameter) args: []",
    40: "(parameter) a: number",
    41: "(parameter) args: [y: string, z: boolean]",
    50: "(parameter) a: number",
    51: "(parameter) b: string",
    52: "(parameter) args: [z: boolean]",
    60: "(parameter) a: number",
    61: "(parameter) b: string",
    62: "(parameter) c: boolean",
    63: "(parameter) args: []",
});
