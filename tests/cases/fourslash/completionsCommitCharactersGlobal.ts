/// <reference path='fourslash.ts' />

//// declare function func(a: string, b: number): { a: string, b: number };
//// const x1 = func(/*1*/)
//// const x2 = func
//// (a/*2*/)
//// (a/*22*/)
//// ;

//// const x3 = func("a", /*3*/)
//// const x4 = func
//// (a, b/*4*/)

//// const x5 = func((a, /*5*/));
//// const x6 = (a/*6*/)
//// const x7 = (a, x/*7*/)

//// function x8(/*8*/) {}
//// function x9(a: number, /*9*/)

//// const x10: [/*10*/]
//// const x11: [ ]

//// let x12;
//// x12 = /*12*/

//// const x13 = `hello, ${/*13*/}`

//// interface I<T> {
////     [/*14*/]: T;
//// }

//// class C {
////     [/*16*/]: string;
////     [str/*17*/: string]: number;
//// }

//// type T = {
////     [x/*18*/yz: number]: boolean;
////     [/*19*/
//// }

//// function F(pred: (x/*20*/)

verify.baselineCompletions();