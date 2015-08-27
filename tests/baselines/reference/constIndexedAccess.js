//// [constIndexedAccess.ts]

const enum numbers {
	zero,
	one
}

interface access {
	0: string;
	1: number;
}

let test: access;

let s = test[0];
let n = test[1];

let s1 = test[numbers.zero];
let n1 = test[numbers.one];

// TODO: Not working
const zero = 0;
const one = 1;

let s2 = test[zero];
let n2 = test[one];

const zeroRef = zero;
const oneRef = one;

let s3 = test[zeroRef];
let n3 = test[oneRef];

const zeroRefEnum = numbers.zero;
const oneRefEnum = numbers.one;

let s4 = test[zeroRefEnum];
let n4 = test[oneRefEnum];


//// [constIndexedAccess.js]
var test;
var s = test[0];
var n = test[1];
var s1 = test[0 /* zero */];
var n1 = test[1 /* one */];
// TODO: Not working
var zero = 0;
var one = 1;
var s2 = test[zero];
var n2 = test[one];
var zeroRef = zero;
var oneRef = one;
var s3 = test[zeroRef];
var n3 = test[oneRef];
var zeroRefEnum = 0 /* zero */;
var oneRefEnum = 1 /* one */;
var s4 = test[zeroRefEnum];
var n4 = test[oneRefEnum];
