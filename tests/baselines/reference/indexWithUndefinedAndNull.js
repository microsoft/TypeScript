//// [tests/cases/compiler/indexWithUndefinedAndNull.ts] ////

//// [indexWithUndefinedAndNull.ts]
interface N {
    [n: number]: string;
}
interface S {
    [s: string]: number;
}
let n: N;
let s: S;
let str: string = n[undefined];
str = n[null];
let num: number = s[undefined];
num = s[null];


//// [indexWithUndefinedAndNull.js]
var n;
var s;
var str = n[undefined];
str = n[null];
var num = s[undefined];
num = s[null];
