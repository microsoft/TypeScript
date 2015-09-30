
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
