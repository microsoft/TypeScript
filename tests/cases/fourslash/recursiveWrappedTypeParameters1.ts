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

verify.quickInfos({
    1: "var yy: I<I<I<I<I<I<number>>>>>>",
    2: "var aa: number",
    3: "var bb: I<number>",
    4: "var cc: I<I<number>>",
    5: "var dd: I<number>",
    6: "var ee: I<I<number>>",
    7: "var ff: I<I<I<number>>>"
});
