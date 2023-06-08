//// [tests/cases/conformance/expressions/binaryOperators/comparisonOperator/comparisonOperatorWithOneOperandIsUndefined.ts] ////

//// [comparisonOperatorWithOneOperandIsUndefined.ts]
var x: typeof undefined;

enum E { a, b, c }

function foo<T>(t: T) {
    var foo_r1 = t < x;
    var foo_r2 = t > x;
    var foo_r3 = t <= x;
    var foo_r4 = t >= x;
    var foo_r5 = t == x;
    var foo_r6 = t != x;
    var foo_r7 = t === x;
    var foo_r8 = t !== x;

    var foo_r1 = x < t;
    var foo_r2 = x > t;
    var foo_r3 = x <= t;
    var foo_r4 = x >= t;
    var foo_r5 = x == t;
    var foo_r6 = x != t;
    var foo_r7 = x === t;
    var foo_r8 = x !== t;
}

var a: boolean;
var b: number;
var c: string;
var d: void;
var e: E;
var f: {};
var g: string[];

// operator <
var r1a1 = x < a;
var r1a2 = x < b;
var r1a3 = x < c;
var r1a4 = x < d;
var r1a5 = x < e;
var r1a6 = x < f;
var r1a7 = x < g;

var r1b1 = a < x;
var r1b2 = b < x;
var r1b3 = c < x;
var r1b4 = d < x;
var r1b5 = e < x;
var r1b6 = f < x;
var r1b7 = g < x;

// operator >
var r2a1 = x > a;
var r2a2 = x > b;
var r2a3 = x > c;
var r2a4 = x > d;
var r2a5 = x > e;
var r2a6 = x > f;
var r2a7 = x > g;

var r2b1 = a > x;
var r2b2 = b > x;
var r2b3 = c > x;
var r2b4 = d > x;
var r2b5 = e > x;
var r2b6 = f > x;
var r2b7 = g > x;

// operator <=
var r3a1 = x <= a;
var r3a2 = x <= b;
var r3a3 = x <= c;
var r3a4 = x <= d;
var r3a5 = x <= e;
var r3a6 = x <= f;
var r3a7 = x <= g;

var r3b1 = a <= x;
var r3b2 = b <= x;
var r3b3 = c <= x;
var r3b4 = d <= x;
var r3b5 = e <= x;
var r3b6 = f <= x;
var r3b7 = g <= x;

// operator >=
var r4a1 = x >= a;
var r4a2 = x >= b;
var r4a3 = x >= c;
var r4a4 = x >= d;
var r4a5 = x >= e;
var r4a6 = x >= f;
var r4a7 = x >= g;

var r4b1 = a >= x;
var r4b2 = b >= x;
var r4b3 = c >= x;
var r4b4 = d >= x;
var r4b5 = e >= x;
var r4b6 = f >= x;
var r4b7 = g >= x;

// operator ==
var r5a1 = x == a;
var r5a2 = x == b;
var r5a3 = x == c;
var r5a4 = x == d;
var r5a5 = x == e;
var r5a6 = x == f;
var r5a7 = x == g;

var r5b1 = a == x;
var r5b2 = b == x;
var r5b3 = c == x;
var r5b4 = d == x;
var r5b5 = e == x;
var r5b6 = f == x;
var r5b7 = g == x;

// operator !=
var r6a1 = x != a;
var r6a2 = x != b;
var r6a3 = x != c;
var r6a4 = x != d;
var r6a5 = x != e;
var r6a6 = x != f;
var r6a7 = x != g;

var r6b1 = a != x;
var r6b2 = b != x;
var r6b3 = c != x;
var r6b4 = d != x;
var r6b5 = e != x;
var r6b6 = f != x;
var r6b7 = g != x;

// operator ===
var r7a1 = x === a;
var r7a2 = x === b;
var r7a3 = x === c;
var r7a4 = x === d;
var r7a5 = x === e;
var r7a6 = x === f;
var r7a7 = x === g;

var r7b1 = a === x;
var r7b2 = b === x;
var r7b3 = c === x;
var r7b4 = d === x;
var r7b5 = e === x;
var r7b6 = f === x;
var r7b7 = g === x;

// operator !==
var r8a1 = x !== a;
var r8a2 = x !== b;
var r8a3 = x !== c;
var r8a4 = x !== d;
var r8a5 = x !== e;
var r8a6 = x !== f;
var r8a7 = x !== g;

var r8b1 = a !== x;
var r8b2 = b !== x;
var r8b3 = c !== x;
var r8b4 = d !== x;
var r8b5 = e !== x;
var r8b6 = f !== x;
var r8b7 = g !== x;

//// [comparisonOperatorWithOneOperandIsUndefined.js]
var x;
var E;
(function (E) {
    E[E["a"] = 0] = "a";
    E[E["b"] = 1] = "b";
    E[E["c"] = 2] = "c";
})(E || (E = {}));
function foo(t) {
    var foo_r1 = t < x;
    var foo_r2 = t > x;
    var foo_r3 = t <= x;
    var foo_r4 = t >= x;
    var foo_r5 = t == x;
    var foo_r6 = t != x;
    var foo_r7 = t === x;
    var foo_r8 = t !== x;
    var foo_r1 = x < t;
    var foo_r2 = x > t;
    var foo_r3 = x <= t;
    var foo_r4 = x >= t;
    var foo_r5 = x == t;
    var foo_r6 = x != t;
    var foo_r7 = x === t;
    var foo_r8 = x !== t;
}
var a;
var b;
var c;
var d;
var e;
var f;
var g;
// operator <
var r1a1 = x < a;
var r1a2 = x < b;
var r1a3 = x < c;
var r1a4 = x < d;
var r1a5 = x < e;
var r1a6 = x < f;
var r1a7 = x < g;
var r1b1 = a < x;
var r1b2 = b < x;
var r1b3 = c < x;
var r1b4 = d < x;
var r1b5 = e < x;
var r1b6 = f < x;
var r1b7 = g < x;
// operator >
var r2a1 = x > a;
var r2a2 = x > b;
var r2a3 = x > c;
var r2a4 = x > d;
var r2a5 = x > e;
var r2a6 = x > f;
var r2a7 = x > g;
var r2b1 = a > x;
var r2b2 = b > x;
var r2b3 = c > x;
var r2b4 = d > x;
var r2b5 = e > x;
var r2b6 = f > x;
var r2b7 = g > x;
// operator <=
var r3a1 = x <= a;
var r3a2 = x <= b;
var r3a3 = x <= c;
var r3a4 = x <= d;
var r3a5 = x <= e;
var r3a6 = x <= f;
var r3a7 = x <= g;
var r3b1 = a <= x;
var r3b2 = b <= x;
var r3b3 = c <= x;
var r3b4 = d <= x;
var r3b5 = e <= x;
var r3b6 = f <= x;
var r3b7 = g <= x;
// operator >=
var r4a1 = x >= a;
var r4a2 = x >= b;
var r4a3 = x >= c;
var r4a4 = x >= d;
var r4a5 = x >= e;
var r4a6 = x >= f;
var r4a7 = x >= g;
var r4b1 = a >= x;
var r4b2 = b >= x;
var r4b3 = c >= x;
var r4b4 = d >= x;
var r4b5 = e >= x;
var r4b6 = f >= x;
var r4b7 = g >= x;
// operator ==
var r5a1 = x == a;
var r5a2 = x == b;
var r5a3 = x == c;
var r5a4 = x == d;
var r5a5 = x == e;
var r5a6 = x == f;
var r5a7 = x == g;
var r5b1 = a == x;
var r5b2 = b == x;
var r5b3 = c == x;
var r5b4 = d == x;
var r5b5 = e == x;
var r5b6 = f == x;
var r5b7 = g == x;
// operator !=
var r6a1 = x != a;
var r6a2 = x != b;
var r6a3 = x != c;
var r6a4 = x != d;
var r6a5 = x != e;
var r6a6 = x != f;
var r6a7 = x != g;
var r6b1 = a != x;
var r6b2 = b != x;
var r6b3 = c != x;
var r6b4 = d != x;
var r6b5 = e != x;
var r6b6 = f != x;
var r6b7 = g != x;
// operator ===
var r7a1 = x === a;
var r7a2 = x === b;
var r7a3 = x === c;
var r7a4 = x === d;
var r7a5 = x === e;
var r7a6 = x === f;
var r7a7 = x === g;
var r7b1 = a === x;
var r7b2 = b === x;
var r7b3 = c === x;
var r7b4 = d === x;
var r7b5 = e === x;
var r7b6 = f === x;
var r7b7 = g === x;
// operator !==
var r8a1 = x !== a;
var r8a2 = x !== b;
var r8a3 = x !== c;
var r8a4 = x !== d;
var r8a5 = x !== e;
var r8a6 = x !== f;
var r8a7 = x !== g;
var r8b1 = a !== x;
var r8b2 = b !== x;
var r8b3 = c !== x;
var r8b4 = d !== x;
var r8b5 = e !== x;
var r8b6 = f !== x;
var r8b7 = g !== x;
