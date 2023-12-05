//// [tests/cases/conformance/expressions/binaryOperators/comparisonOperator/comparisonOperatorWithInvalidOperand.ts] ////

//// [comparisonOperatorWithInvalidOperand.ts]
// repro #15506
// assumes that only valid comparisons are between anys, numbers and strings
var a: boolean = false;
var b: number = 0;
var c: string = "";
var d: Date = new Date();
var e: number[] = [];
var f: {} = {};
var g: string[] = [];
var h: bigint = 9007199254740991n;
var i: Number = 0;
var j: any;
const k = 0;
const l = 9007199254740991n;

// operator <
// boolean
var r1a1 = a < a;
var r1a2 = a < b;
var r1a3 = a < c;
var r1a4 = a < d;
var r1a5 = a < e;
var r1a6 = a < f;
var r1a7 = a < g;
var r1a8 = a < h;
var r1a9 = a < i;
var r1a10 = a < j;
var r1a11 = a < k;
var r1a12 = a < l;

// number
var r1b1 = b < c;
var r1b2 = b < d;
var r1b3 = b < e;
var r1b4 = b < f;
var r1b5 = b < g;
var r1b6 = b < h;
var r1b7 = b < i;
var r1b8 = b < j;
var r1b9 = b < k;
var r1b10 = b < l;
var r1b11 = k < l;

// Date
var r1c1 = d < d;
var r1c2 = d < a;

// operator >
// boolean
var r2a1 = a > a;
var r2a2 = a > b;
var r2a3 = a > c;
var r2a4 = a > d;
var r2a5 = a > e;
var r2a6 = a > f;
var r2a7 = a > g;
var r2a8 = a > h;
var r2a9 = a > i;
var r2a10 = a > j;
var r2a11 = a > k;
var r2a12 = a > l;

// number
var r2b1 = b > c;
var r2b2 = b > d;
var r2b3 = b > e;
var r2b4 = b > f;
var r2b5 = b > g;
var r2b6 = b > h;
var r2b7 = b > i;
var r2b8 = b > j;
var r2b9 = b > k;
var r2b10 = b > l;
var r2b11 = k > l;

// Date
var r2c1 = d > d;
var r2c2 = d > a;

// operator <=
// boolean
var r3a1 = a <= a;
var r3a2 = a <= b;
var r3a3 = a <= c;
var r3a4 = a <= d;
var r3a5 = a <= e;
var r3a6 = a <= f;
var r3a7 = a <= g;
var r3a8 = a <= h;
var r3a9 = a <= i;
var r3a10 = a <= j;
var r3a11 = a <= k;
var r3a12 = a <= l;

// number
var r3b1 = b <= c;
var r3b2 = b <= d;
var r3b3 = b <= e;
var r3b4 = b <= f;
var r3b5 = b <= g;
var r3b6 = b <= h;
var r3b7 = b <= i;
var r3b8 = b <= j;
var r3b9 = b <= k;
var r3b10 = b <= l;
var r3b11 = k <= l;

// Date
var r3c1 = d <= d;
var r3c2 = d <= a;

// operator >=
// boolean
var r4a1 = a >= a;
var r4a2 = a >= b;
var r4a3 = a >= c;
var r4a4 = a >= d;
var r4a5 = a >= e;
var r4a6 = a >= f;
var r4a7 = a >= g;
var r4a8 = a >= h;
var r4a9 = a >= i;
var r4a10 = a >= j;
var r4a11 = a >= k;
var r4a12 = a >= l;

// number
var r4b1 = b >= c;
var r4b2 = b >= d;
var r4b3 = b >= e;
var r4b4 = b >= f;
var r4b5 = b >= g;
var r4b6 = b >= h;
var r4b7 = b >= i;
var r4b8 = b >= j;
var r4b9 = b >= k;
var r4b10 = b >= l;
var r4b11 = k >= l;

// Date
var r4c1 = d >= d;
var r4c2 = d >= a;


//// [comparisonOperatorWithInvalidOperand.js]
// repro #15506
// assumes that only valid comparisons are between anys, numbers and strings
var a = false;
var b = 0;
var c = "";
var d = new Date();
var e = [];
var f = {};
var g = [];
var h = 9007199254740991n;
var i = 0;
var j;
var k = 0;
var l = 9007199254740991n;
// operator <
// boolean
var r1a1 = a < a;
var r1a2 = a < b;
var r1a3 = a < c;
var r1a4 = a < d;
var r1a5 = a < e;
var r1a6 = a < f;
var r1a7 = a < g;
var r1a8 = a < h;
var r1a9 = a < i;
var r1a10 = a < j;
var r1a11 = a < k;
var r1a12 = a < l;
// number
var r1b1 = b < c;
var r1b2 = b < d;
var r1b3 = b < e;
var r1b4 = b < f;
var r1b5 = b < g;
var r1b6 = b < h;
var r1b7 = b < i;
var r1b8 = b < j;
var r1b9 = b < k;
var r1b10 = b < l;
var r1b11 = k < l;
// Date
var r1c1 = d < d;
var r1c2 = d < a;
// operator >
// boolean
var r2a1 = a > a;
var r2a2 = a > b;
var r2a3 = a > c;
var r2a4 = a > d;
var r2a5 = a > e;
var r2a6 = a > f;
var r2a7 = a > g;
var r2a8 = a > h;
var r2a9 = a > i;
var r2a10 = a > j;
var r2a11 = a > k;
var r2a12 = a > l;
// number
var r2b1 = b > c;
var r2b2 = b > d;
var r2b3 = b > e;
var r2b4 = b > f;
var r2b5 = b > g;
var r2b6 = b > h;
var r2b7 = b > i;
var r2b8 = b > j;
var r2b9 = b > k;
var r2b10 = b > l;
var r2b11 = k > l;
// Date
var r2c1 = d > d;
var r2c2 = d > a;
// operator <=
// boolean
var r3a1 = a <= a;
var r3a2 = a <= b;
var r3a3 = a <= c;
var r3a4 = a <= d;
var r3a5 = a <= e;
var r3a6 = a <= f;
var r3a7 = a <= g;
var r3a8 = a <= h;
var r3a9 = a <= i;
var r3a10 = a <= j;
var r3a11 = a <= k;
var r3a12 = a <= l;
// number
var r3b1 = b <= c;
var r3b2 = b <= d;
var r3b3 = b <= e;
var r3b4 = b <= f;
var r3b5 = b <= g;
var r3b6 = b <= h;
var r3b7 = b <= i;
var r3b8 = b <= j;
var r3b9 = b <= k;
var r3b10 = b <= l;
var r3b11 = k <= l;
// Date
var r3c1 = d <= d;
var r3c2 = d <= a;
// operator >=
// boolean
var r4a1 = a >= a;
var r4a2 = a >= b;
var r4a3 = a >= c;
var r4a4 = a >= d;
var r4a5 = a >= e;
var r4a6 = a >= f;
var r4a7 = a >= g;
var r4a8 = a >= h;
var r4a9 = a >= i;
var r4a10 = a >= j;
var r4a11 = a >= k;
var r4a12 = a >= l;
// number
var r4b1 = b >= c;
var r4b2 = b >= d;
var r4b3 = b >= e;
var r4b4 = b >= f;
var r4b5 = b >= g;
var r4b6 = b >= h;
var r4b7 = b >= i;
var r4b8 = b >= j;
var r4b9 = b >= k;
var r4b10 = b >= l;
var r4b11 = k >= l;
// Date
var r4c1 = d >= d;
var r4c2 = d >= a;
