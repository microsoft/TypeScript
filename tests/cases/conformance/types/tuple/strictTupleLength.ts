var t0: [];
var t1: [number];
var t2: [number, number];
var arr: number[];

var len0: 0 = t0.length;
var len1: 1 = t1.length;
var len2: 2 = t2.length;
var lena: number = arr.length;

var t1 = t2; // error
var t2 = t1; // error

type A<T extends any[]> = T['length'];
var b: A<[boolean]>;
var c: 1 = b;

t1 = arr; // error with or without strict
arr = t1; // ok with or without strict
