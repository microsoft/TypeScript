//// [tests/cases/conformance/expressions/binaryOperators/comparisonOperator/comparisonOperatorWithSubtypeEnumAndNumber.ts] ////

//// [comparisonOperatorWithSubtypeEnumAndNumber.ts]
enum E { a, b, c }

var a: E;
var b: number;

// operator <
var ra1 = a < b;
var ra2 = b < a;
var ra3 = E.a < b;
var ra4 = b < E.a;
var ra5 = E.a < 0;
var ra6 = 0 < E.a;

// operator >
var rb1 = a > b;
var rb2 = b > a;
var rb3 = E.a > b;
var rb4 = b > E.a;
var rb5 = E.a > 0;
var rb6 = 0 > E.a;

// operator <=
var rc1 = a <= b;
var rc2 = b <= a;
var rc3 = E.a <= b;
var rc4 = b <= E.a;
var rc5 = E.a <= 0;
var rc6 = 0 <= E.a;

// operator >=
var rd1 = a >= b;
var rd2 = b >= a;
var rd3 = E.a >= b;
var rd4 = b >= E.a;
var rd5 = E.a >= 0;
var rd6 = 0 >= E.a;

// operator ==
var re1 = a == b;
var re2 = b == a;
var re3 = E.a == b;
var re4 = b == E.a;
var re5 = E.a == 0;
var re6 = 0 == E.a;

// operator !=
var rf1 = a != b;
var rf2 = b != a;
var rf3 = E.a != b;
var rf4 = b != E.a;
var rf5 = E.a != 0;
var rf6 = 0 != E.a;

// operator ===
var rg1 = a === b;
var rg2 = b === a;
var rg3 = E.a === b;
var rg4 = b === E.a;
var rg5 = E.a === 0;
var rg6 = 0 === E.a;

// operator !==
var rh1 = a !== b;
var rh2 = b !== a;
var rh3 = E.a !== b;
var rh4 = b !== E.a;
var rh5 = E.a !== 0;
var rh6 = 0 !== E.a;

//// [comparisonOperatorWithSubtypeEnumAndNumber.js]
var E;
(function (E) {
    E[E["a"] = 0] = "a";
    E[E["b"] = 1] = "b";
    E[E["c"] = 2] = "c";
})(E || (E = {}));
var a;
var b;
// operator <
var ra1 = a < b;
var ra2 = b < a;
var ra3 = E.a < b;
var ra4 = b < E.a;
var ra5 = E.a < 0;
var ra6 = 0 < E.a;
// operator >
var rb1 = a > b;
var rb2 = b > a;
var rb3 = E.a > b;
var rb4 = b > E.a;
var rb5 = E.a > 0;
var rb6 = 0 > E.a;
// operator <=
var rc1 = a <= b;
var rc2 = b <= a;
var rc3 = E.a <= b;
var rc4 = b <= E.a;
var rc5 = E.a <= 0;
var rc6 = 0 <= E.a;
// operator >=
var rd1 = a >= b;
var rd2 = b >= a;
var rd3 = E.a >= b;
var rd4 = b >= E.a;
var rd5 = E.a >= 0;
var rd6 = 0 >= E.a;
// operator ==
var re1 = a == b;
var re2 = b == a;
var re3 = E.a == b;
var re4 = b == E.a;
var re5 = E.a == 0;
var re6 = 0 == E.a;
// operator !=
var rf1 = a != b;
var rf2 = b != a;
var rf3 = E.a != b;
var rf4 = b != E.a;
var rf5 = E.a != 0;
var rf6 = 0 != E.a;
// operator ===
var rg1 = a === b;
var rg2 = b === a;
var rg3 = E.a === b;
var rg4 = b === E.a;
var rg5 = E.a === 0;
var rg6 = 0 === E.a;
// operator !==
var rh1 = a !== b;
var rh2 = b !== a;
var rh3 = E.a !== b;
var rh4 = b !== E.a;
var rh5 = E.a !== 0;
var rh6 = 0 !== E.a;
