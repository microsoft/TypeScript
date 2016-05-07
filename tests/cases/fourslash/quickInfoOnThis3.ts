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

goTo.marker('1');
verify.quickInfoIs('any');
goTo.marker('2');
verify.quickInfoIs('(parameter) this: void');
goTo.marker('3');
verify.quickInfoIs('void');
goTo.marker('4');
verify.quickInfoIs('(parameter) this: Restricted');
goTo.marker('5');
verify.quickInfoIs('this: Restricted');
goTo.marker('6');

verify.quickInfoIs('(parameter) this: {\n    n: number;\n}');
goTo.marker('7');
verify.quickInfoIs('this: {\n    n: number;\n}');
