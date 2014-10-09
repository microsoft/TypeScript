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
////var /*1*/r1 = numeric[1];
////var /*2*/r2 = numeric['1'];
////var /*3*/r3 = stringy[1];
////var /*4*/r4 = stringy['1'];
////var /*5*/r5 = numericPlus[1];
////var /*6*/r6 = numericPlus['1'];
////var /*7*/r7 = stringPlus[1];
////var /*8*/r8 = stringPlus['1'];
////var /*9*/r9 = numericG[1];
////var /*10*/r10 = numericG['1'];
////var /*11*/r11 = stringyG[1];
////var /*12*/r12 = stringyG['1'];
////var /*13*/r13 = ty[1];
////var /*14*/r14 = ty['1'];
////var /*15*/r15 = ty2[1];
////var /*16*/r16 = ty2['1'];


goTo.marker('1');
verify.quickInfoIs('(var) r1: Date');

goTo.marker('2');
verify.quickInfoIs('(var) r2: any');

goTo.marker('3');
verify.quickInfoIs('(var) r3: RegExp');

goTo.marker('4');
verify.quickInfoIs('(var) r4: RegExp');

goTo.marker('5');
verify.quickInfoIs('(var) r5: Date');

goTo.marker('6');
verify.quickInfoIs('(var) r6: any');

goTo.marker('7');
verify.quickInfoIs('(var) r7: RegExp');

goTo.marker('8');
verify.quickInfoIs('(var) r8: RegExp');

goTo.marker('9');
verify.quickInfoIs('(var) r9: Date');

goTo.marker('10');
verify.quickInfoIs('(var) r10: any');

goTo.marker('11');
verify.quickInfoIs('(var) r11: Date');

goTo.marker('12');
verify.quickInfoIs('(var) r12: Date');

goTo.marker('13');
verify.quickInfoIs('(var) r13: Ty<Date>');

goTo.marker('14');
verify.quickInfoIs('(var) r14: any');

goTo.marker('15');
verify.quickInfoIs('(var) r15: {\n    [x: number]: Date;\n}');

goTo.marker('16');
verify.quickInfoIs('(var) r16: any');