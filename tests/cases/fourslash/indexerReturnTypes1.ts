/// <reference path='fourslash.ts'/>

////interface Numeric {
////    [x: number]: Date;
////}
////}
////interface Stringy {
////    [x: string]: RegExp;
////}
////}
////interface NumericPlus {
////    [x: number]: Date;
////    foo(): Date;
////}
////}
////interface StringyPlus {
////    [x: string]: RegExp;
////    foo(): RegExp;
////}
////}
////interface NumericG<T> {
////    [x: number]: T;
////}
////}
////interface StringyG<T> {
////    [x: string]: T;
////}
////}
////interface Ty<T> {
////    [x: number]: Ty<T>;
////}
////interface Ty2<T> {
////    [x: number]: { [x: number]: T };
////}
////
////
////}
////var numeric: Numeric;
////var stringy: Stringy;
////var numericPlus: NumericPlus;
////var stringPlus: StringyPlus;
////var numericG: NumericG<Date>;
////var stringyG: StringyG<Date>;
////var ty: Ty<Date>;
////var ty2: Ty2<Date>;
////
////var r1/*1*/ = numeric[1];
////var r2/*2*/ = numeric['1'];
////var r3/*3*/ = stringy[1];
////var r4/*4*/ = stringy['1'];
////var r5/*5*/ = numericPlus[1];
////var r6/*6*/ = numericPlus['1'];
////var r7/*7*/ = stringPlus[1];
////var r8/*8*/ = stringPlus['1'];
////var r9/*9*/ = numericG[1];
////var r10/*10*/ = numericG['1'];
////var r11/*11*/ = stringyG[1];
////var r12/*12*/ = stringyG['1'];
////var r13/*13*/ = ty[1];
////var r14/*14*/ = ty['1'];
////var r15/*15*/ = ty2[1];
////var r16/*16*/ = ty2['1'];


goTo.marker('1');
verify.quickInfoIs('Date');

goTo.marker('2');
verify.quickInfoIs('any');

goTo.marker('3');
verify.quickInfoIs('RegExp');

goTo.marker('4');
verify.quickInfoIs('RegExp');

goTo.marker('5');
verify.quickInfoIs('Date');

goTo.marker('6');
verify.quickInfoIs('any');

goTo.marker('7');
verify.quickInfoIs('RegExp');

goTo.marker('8');
verify.quickInfoIs('RegExp');

goTo.marker('9');
verify.quickInfoIs('Date');

goTo.marker('10');
verify.quickInfoIs('any');

goTo.marker('11');
verify.quickInfoIs('Date');

goTo.marker('12');
verify.quickInfoIs('Date');

goTo.marker('13');
verify.quickInfoIs('Ty<Date>');

goTo.marker('14');
verify.quickInfoIs('any');

goTo.marker('15');
verify.quickInfoIs('{ [x: number]: Date; }');

goTo.marker('16');
verify.quickInfoIs('any');