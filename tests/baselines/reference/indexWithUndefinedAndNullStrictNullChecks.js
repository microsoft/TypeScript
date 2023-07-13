//// [tests/cases/compiler/indexWithUndefinedAndNullStrictNullChecks.ts] ////

//// [indexWithUndefinedAndNullStrictNullChecks.ts]
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


//// [indexWithUndefinedAndNullStrictNullChecks.js]
var n;
var s;
var str = n[undefined];
str = n[null];
var num = s[undefined];
num = s[null];
