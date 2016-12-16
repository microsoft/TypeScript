/// <reference path='fourslash.ts' />
////interface Restricted {
////    n: number;
////}
////function implicitAny(x: number): void {
////    return th/*1*/is;
////}
////function explicitVoid(th/*2*/is: void, x: number): void {
////    return th/*3*/is;
////}
////function explicitInterface(th/*4*/is: Restricted): void {
////    console.log(thi/*5*/s);
////}
////function explicitLiteral(th/*6*/is: { n: number }): void {
////    console.log(th/*7*/is);
////}

verify.quickInfos({
    1: "any",
    2: "(parameter) this: void",
    3: "this: void", 
    4: "(parameter) this: Restricted", 
    5: "this: Restricted",
    6: "(parameter) this: {\n    n: number;\n}",
    7: "this: {\n    n: number;\n}"
});
