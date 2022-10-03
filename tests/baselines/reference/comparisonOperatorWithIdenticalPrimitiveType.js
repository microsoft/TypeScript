//// [comparisonOperatorWithIdenticalPrimitiveType.ts]
enum E { a, b, c }

var a: number;
var b: boolean;
var c: string;
var d: void;
var e: E;

// operator <
var ra1 = a < a;
var ra2 = b < b;
var ra3 = c < c;
var ra4 = d < d;
var ra5 = e < e;
var ra6 = null < null;
var ra7 = undefined < undefined;

// operator >
var rb1 = a > a;
var rb2 = b > b;
var rb3 = c > c;
var rb4 = d > d;
var rb5 = e > e;
var rb6 = null > null;
var rb7 = undefined > undefined;

// operator <=
var rc1 = a <= a;
var rc2 = b <= b;
var rc3 = c <= c;
var rc4 = d <= d;
var rc5 = e <= e;
var rc6 = null <= null;
var rc7 = undefined <= undefined;

// operator >=
var rd1 = a >= a;
var rd2 = b >= b;
var rd3 = c >= c;
var rd4 = d >= d;
var rd5 = e >= e;
var rd6 = null >= null;
var rd7 = undefined >= undefined;

// operator ==
var re1 = a == a;
var re2 = b == b;
var re3 = c == c;
var re4 = d == d;
var re5 = e == e;
var re6 = null == null;
var re7 = undefined == undefined;

// operator !=
var rf1 = a != a;
var rf2 = b != b;
var rf3 = c != c;
var rf4 = d != d;
var rf5 = e != e;
var rf6 = null != null;
var rf7 = undefined != undefined;

// operator ===
var rg1 = a === a;
var rg2 = b === b;
var rg3 = c === c;
var rg4 = d === d;
var rg5 = e === e;
var rg6 = null === null;
var rg7 = undefined === undefined;

// operator !==
var rh1 = a !== a;
var rh2 = b !== b;
var rh3 = c !== c;
var rh4 = d !== d;
var rh5 = e !== e;
var rh6 = null !== null;
var rh7 = undefined !== undefined;

//// [comparisonOperatorWithIdenticalPrimitiveType.js]
var E;
(function (E) {
    E[E["a"] = 0] = "a";
    E[E["b"] = 1] = "b";
    E[E["c"] = 2] = "c";
})(E || (E = {}));
var a;
var b;
var c;
var d;
var e;
// operator <
var ra1 = a < a;
var ra2 = b < b;
var ra3 = c < c;
var ra4 = d < d;
var ra5 = e < e;
var ra6 = null < null;
var ra7 = undefined < undefined;
// operator >
var rb1 = a > a;
var rb2 = b > b;
var rb3 = c > c;
var rb4 = d > d;
var rb5 = e > e;
var rb6 = null > null;
var rb7 = undefined > undefined;
// operator <=
var rc1 = a <= a;
var rc2 = b <= b;
var rc3 = c <= c;
var rc4 = d <= d;
var rc5 = e <= e;
var rc6 = null <= null;
var rc7 = undefined <= undefined;
// operator >=
var rd1 = a >= a;
var rd2 = b >= b;
var rd3 = c >= c;
var rd4 = d >= d;
var rd5 = e >= e;
var rd6 = null >= null;
var rd7 = undefined >= undefined;
// operator ==
var re1 = a == a;
var re2 = b == b;
var re3 = c == c;
var re4 = d == d;
var re5 = e == e;
var re6 = null == null;
var re7 = undefined == undefined;
// operator !=
var rf1 = a != a;
var rf2 = b != b;
var rf3 = c != c;
var rf4 = d != d;
var rf5 = e != e;
var rf6 = null != null;
var rf7 = undefined != undefined;
// operator ===
var rg1 = a === a;
var rg2 = b === b;
var rg3 = c === c;
var rg4 = d === d;
var rg5 = e === e;
var rg6 = null === null;
var rg7 = undefined === undefined;
// operator !==
var rh1 = a !== a;
var rh2 = b !== b;
var rh3 = c !== c;
var rh4 = d !== d;
var rh5 = e !== e;
var rh6 = null !== null;
var rh7 = undefined !== undefined;
