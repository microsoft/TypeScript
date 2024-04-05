//// [tests/cases/conformance/expressions/binaryOperators/comparisonOperator/comparisonOperatorWithSubtypeObjectOnOptionalProperty.ts] ////

//// [comparisonOperatorWithSubtypeObjectOnOptionalProperty.ts]
interface I {
    a: string;
    b?: number;
}

interface J {
    a: string;
}

var a: I;
var b: J;

// operator <
var ra1 = a < b;
var ra2 = b < a;

// operator >
var rb1 = a > b;
var rb2 = b > a;

// operator <=
var rc1 = a <= b;
var rc2 = b <= a;

// operator >=
var rd1 = a >= b;
var rd2 = b >= a;

// operator ==
var re1 = a == b;
var re2 = b == a;

// operator !=
var rf1 = a != b;
var rf2 = b != a;

// operator ===
var rg1 = a === b;
var rg2 = b === a;

// operator !==
var rh1 = a !== b;
var rh2 = b !== a;

//// [comparisonOperatorWithSubtypeObjectOnOptionalProperty.js]
var a;
var b;
// operator <
var ra1 = a < b;
var ra2 = b < a;
// operator >
var rb1 = a > b;
var rb2 = b > a;
// operator <=
var rc1 = a <= b;
var rc2 = b <= a;
// operator >=
var rd1 = a >= b;
var rd2 = b >= a;
// operator ==
var re1 = a == b;
var re2 = b == a;
// operator !=
var rf1 = a != b;
var rf2 = b != a;
// operator ===
var rg1 = a === b;
var rg2 = b === a;
// operator !==
var rh1 = a !== b;
var rh2 = b !== a;
