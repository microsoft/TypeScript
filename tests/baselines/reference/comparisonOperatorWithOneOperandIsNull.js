//// [comparisonOperatorWithOneOperandIsNull.ts]
enum E { a, b, c }

function foo<T>(t: T) {
    var foo_r1 = t < null;
    var foo_r2 = t > null;
    var foo_r3 = t <= null;
    var foo_r4 = t >= null;
    var foo_r5 = t == null;
    var foo_r6 = t != null;
    var foo_r7 = t === null;
    var foo_r8 = t !== null;

    var foo_r1 = null < t;
    var foo_r2 = null > t;
    var foo_r3 = null <= t;
    var foo_r4 = null >= t;
    var foo_r5 = null == t;
    var foo_r6 = null != t;
    var foo_r7 = null === t;
    var foo_r8 = null !== t;
}

var a: boolean;
var b: number;
var c: string;
var d: void;
var e: E;
var f: {};
var g: string[];

// operator <
var r1a1 = null < a;
var r1a2 = null < b;
var r1a3 = null < c;
var r1a4 = null < d;
var r1a5 = null < e;
var r1a6 = null < f;
var r1a7 = null < g;

var r1b1 = a < null;
var r1b2 = b < null;
var r1b3 = c < null;
var r1b4 = d < null;
var r1b5 = e < null;
var r1b6 = f < null;
var r1b7 = g < null;

// operator >
var r2a1 = null > a;
var r2a2 = null > b;
var r2a3 = null > c;
var r2a4 = null > d;
var r2a5 = null > e;
var r2a6 = null > f;
var r2a7 = null > g;

var r2b1 = a > null;
var r2b2 = b > null;
var r2b3 = c > null;
var r2b4 = d > null;
var r2b5 = e > null;
var r2b6 = f > null;
var r2b7 = g > null;

// operator <=
var r3a1 = null <= a;
var r3a2 = null <= b;
var r3a3 = null <= c;
var r3a4 = null <= d;
var r3a5 = null <= e;
var r3a6 = null <= f;
var r3a7 = null <= g;

var r3b1 = a <= null;
var r3b2 = b <= null;
var r3b3 = c <= null;
var r3b4 = d <= null;
var r3b5 = e <= null;
var r3b6 = f <= null;
var r3b7 = g <= null;

// operator >=
var r4a1 = null >= a;
var r4a2 = null >= b;
var r4a3 = null >= c;
var r4a4 = null >= d;
var r4a5 = null >= e;
var r4a6 = null >= f;
var r4a7 = null >= g;

var r4b1 = a >= null;
var r4b2 = b >= null;
var r4b3 = c >= null;
var r4b4 = d >= null;
var r4b5 = e >= null;
var r4b6 = f >= null;
var r4b7 = g >= null;

// operator ==
var r5a1 = null == a;
var r5a2 = null == b;
var r5a3 = null == c;
var r5a4 = null == d;
var r5a5 = null == e;
var r5a6 = null == f;
var r5a7 = null == g;

var r5b1 = a == null;
var r5b2 = b == null;
var r5b3 = c == null;
var r5b4 = d == null;
var r5b5 = e == null;
var r5b6 = f == null;
var r5b7 = g == null;

// operator !=
var r6a1 = null != a;
var r6a2 = null != b;
var r6a3 = null != c;
var r6a4 = null != d;
var r6a5 = null != e;
var r6a6 = null != f;
var r6a7 = null != g;

var r6b1 = a != null;
var r6b2 = b != null;
var r6b3 = c != null;
var r6b4 = d != null;
var r6b5 = e != null;
var r6b6 = f != null;
var r6b7 = g != null;

// operator ===
var r7a1 = null === a;
var r7a2 = null === b;
var r7a3 = null === c;
var r7a4 = null === d;
var r7a5 = null === e;
var r7a6 = null === f;
var r7a7 = null === g;

var r7b1 = a === null;
var r7b2 = b === null;
var r7b3 = c === null;
var r7b4 = d === null;
var r7b5 = e === null;
var r7b6 = f === null;
var r7b7 = g === null;

// operator !==
var r8a1 = null !== a;
var r8a2 = null !== b;
var r8a3 = null !== c;
var r8a4 = null !== d;
var r8a5 = null !== e;
var r8a6 = null !== f;
var r8a7 = null !== g;

var r8b1 = a !== null;
var r8b2 = b !== null;
var r8b3 = c !== null;
var r8b4 = d !== null;
var r8b5 = e !== null;
var r8b6 = f !== null;
var r8b7 = g !== null;

//// [comparisonOperatorWithOneOperandIsNull.js]
var E;
(function (E) {
    E[E["a"] = 0] = "a";
    E[E["b"] = 1] = "b";
    E[E["c"] = 2] = "c";
})(E || (E = {}));
function foo(t) {
    var foo_r1 = t < null;
    var foo_r2 = t > null;
    var foo_r3 = t <= null;
    var foo_r4 = t >= null;
    var foo_r5 = t == null;
    var foo_r6 = t != null;
    var foo_r7 = t === null;
    var foo_r8 = t !== null;
    var foo_r1 = null < t;
    var foo_r2 = null > t;
    var foo_r3 = null <= t;
    var foo_r4 = null >= t;
    var foo_r5 = null == t;
    var foo_r6 = null != t;
    var foo_r7 = null === t;
    var foo_r8 = null !== t;
}
var a;
var b;
var c;
var d;
var e;
var f;
var g;
// operator <
var r1a1 = null < a;
var r1a2 = null < b;
var r1a3 = null < c;
var r1a4 = null < d;
var r1a5 = null < e;
var r1a6 = null < f;
var r1a7 = null < g;
var r1b1 = a < null;
var r1b2 = b < null;
var r1b3 = c < null;
var r1b4 = d < null;
var r1b5 = e < null;
var r1b6 = f < null;
var r1b7 = g < null;
// operator >
var r2a1 = null > a;
var r2a2 = null > b;
var r2a3 = null > c;
var r2a4 = null > d;
var r2a5 = null > e;
var r2a6 = null > f;
var r2a7 = null > g;
var r2b1 = a > null;
var r2b2 = b > null;
var r2b3 = c > null;
var r2b4 = d > null;
var r2b5 = e > null;
var r2b6 = f > null;
var r2b7 = g > null;
// operator <=
var r3a1 = null <= a;
var r3a2 = null <= b;
var r3a3 = null <= c;
var r3a4 = null <= d;
var r3a5 = null <= e;
var r3a6 = null <= f;
var r3a7 = null <= g;
var r3b1 = a <= null;
var r3b2 = b <= null;
var r3b3 = c <= null;
var r3b4 = d <= null;
var r3b5 = e <= null;
var r3b6 = f <= null;
var r3b7 = g <= null;
// operator >=
var r4a1 = null >= a;
var r4a2 = null >= b;
var r4a3 = null >= c;
var r4a4 = null >= d;
var r4a5 = null >= e;
var r4a6 = null >= f;
var r4a7 = null >= g;
var r4b1 = a >= null;
var r4b2 = b >= null;
var r4b3 = c >= null;
var r4b4 = d >= null;
var r4b5 = e >= null;
var r4b6 = f >= null;
var r4b7 = g >= null;
// operator ==
var r5a1 = null == a;
var r5a2 = null == b;
var r5a3 = null == c;
var r5a4 = null == d;
var r5a5 = null == e;
var r5a6 = null == f;
var r5a7 = null == g;
var r5b1 = a == null;
var r5b2 = b == null;
var r5b3 = c == null;
var r5b4 = d == null;
var r5b5 = e == null;
var r5b6 = f == null;
var r5b7 = g == null;
// operator !=
var r6a1 = null != a;
var r6a2 = null != b;
var r6a3 = null != c;
var r6a4 = null != d;
var r6a5 = null != e;
var r6a6 = null != f;
var r6a7 = null != g;
var r6b1 = a != null;
var r6b2 = b != null;
var r6b3 = c != null;
var r6b4 = d != null;
var r6b5 = e != null;
var r6b6 = f != null;
var r6b7 = g != null;
// operator ===
var r7a1 = null === a;
var r7a2 = null === b;
var r7a3 = null === c;
var r7a4 = null === d;
var r7a5 = null === e;
var r7a6 = null === f;
var r7a7 = null === g;
var r7b1 = a === null;
var r7b2 = b === null;
var r7b3 = c === null;
var r7b4 = d === null;
var r7b5 = e === null;
var r7b6 = f === null;
var r7b7 = g === null;
// operator !==
var r8a1 = null !== a;
var r8a2 = null !== b;
var r8a3 = null !== c;
var r8a4 = null !== d;
var r8a5 = null !== e;
var r8a6 = null !== f;
var r8a7 = null !== g;
var r8b1 = a !== null;
var r8b2 = b !== null;
var r8b3 = c !== null;
var r8b4 = d !== null;
var r8b5 = e !== null;
var r8b6 = f !== null;
var r8b7 = g !== null;
