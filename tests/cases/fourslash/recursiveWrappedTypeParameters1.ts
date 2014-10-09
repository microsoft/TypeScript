/// <reference path='fourslash.ts'/>

////interface I<T> {
////	a: T;
////	b: I<T>;
////	c: I<I<T>>;
////}
////var x: I<number>;
////var y/*1*/y = x.c.c.c.c.c.b;
////var a/*2*/a = x.a;
////var b/*3*/b = x.b;
////var c/*4*/c = x.c;
////var d/*5*/d = x.c.a;
////var e/*6*/e = x.c.b;
////var f/*7*/f = x.c.c; 

goTo.marker('1');
verify.quickInfoIs('(var) yy: I<I<I<I<I<I<number>>>>>>');

goTo.marker('2');
verify.quickInfoIs('(var) aa: number');

goTo.marker('3');
verify.quickInfoIs('(var) bb: I<number>');

goTo.marker('4');
verify.quickInfoIs('(var) cc: I<I<number>>');

goTo.marker('5');
verify.quickInfoIs('(var) dd: I<number>');

goTo.marker('6');
verify.quickInfoIs('(var) ee: I<I<number>>');

goTo.marker('7');
verify.quickInfoIs('(var) ff: I<I<I<number>>>');