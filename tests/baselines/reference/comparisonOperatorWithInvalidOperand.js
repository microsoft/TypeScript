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
a < a;
a < b;
a < c;
a < d;
a < e;
a < f;
a < g;
a < h;
a < i;
a < j;
a < k;
a < l;

// number
b < c;
b < d;
b < e;
b < f;
b < g;
b < h;
b < i;
b < j;
b < k;
b < l;
k < l;

// Date
d < d;
d < a;

// operator >
// boolean
a > a;
a > b;
a > c;
a > d;
a > e;
a > f;
a > g;
a > h;
a > i;
a > j;
a > k;
a > l;

// number
b > c;
b > d;
b > e;
b > f;
b > g;
b > h;
b > i;
b > j;
b > k;
b > l;
k > l;

// Date
d > d;
d > a;

// operator <=
// boolean
a <= a;
a <= b;
a <= c;
a <= d;
a <= e;
a <= f;
a <= g;
a <= h;
a <= i;
a <= j;
a <= k;
a <= l;

// number
b <= c;
b <= d;
b <= e;
b <= f;
b <= g;
b <= h;
b <= i;
b <= j;
b <= k;
b <= l;
k <= l;

// Date
d <= d;
d <= a;

// operator >=
// boolean
a >= a;
a >= b;
a >= c;
a >= d;
a >= e;
a >= f;
a >= g;
a >= h;
a >= i;
a >= j;
a >= k;
a >= l;

// number
b >= c;
b >= d;
b >= e;
b >= f;
b >= g;
b >= h;
b >= i;
b >= j;
b >= k;
b >= l;
k >= l;

// Date
d >= d;
d >= a;


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
a < a;
a < b;
a < c;
a < d;
a < e;
a < f;
a < g;
a < h;
a < i;
a < j;
a < k;
a < l;
// number
b < c;
b < d;
b < e;
b < f;
b < g;
b < h;
b < i;
b < j;
b < k;
b < l;
k < l;
// Date
d < d;
d < a;
// operator >
// boolean
a > a;
a > b;
a > c;
a > d;
a > e;
a > f;
a > g;
a > h;
a > i;
a > j;
a > k;
a > l;
// number
b > c;
b > d;
b > e;
b > f;
b > g;
b > h;
b > i;
b > j;
b > k;
b > l;
k > l;
// Date
d > d;
d > a;
// operator <=
// boolean
a <= a;
a <= b;
a <= c;
a <= d;
a <= e;
a <= f;
a <= g;
a <= h;
a <= i;
a <= j;
a <= k;
a <= l;
// number
b <= c;
b <= d;
b <= e;
b <= f;
b <= g;
b <= h;
b <= i;
b <= j;
b <= k;
b <= l;
k <= l;
// Date
d <= d;
d <= a;
// operator >=
// boolean
a >= a;
a >= b;
a >= c;
a >= d;
a >= e;
a >= f;
a >= g;
a >= h;
a >= i;
a >= j;
a >= k;
a >= l;
// number
b >= c;
b >= d;
b >= e;
b >= f;
b >= g;
b >= h;
b >= i;
b >= j;
b >= k;
b >= l;
k >= l;
// Date
d >= d;
d >= a;
