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
