// @strictNullChecks: false
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
