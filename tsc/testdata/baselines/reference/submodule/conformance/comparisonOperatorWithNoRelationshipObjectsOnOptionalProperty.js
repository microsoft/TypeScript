//// [tests/cases/conformance/expressions/binaryOperators/comparisonOperator/comparisonOperatorWithNoRelationshipObjectsOnOptionalProperty.ts] ////

//// [comparisonOperatorWithNoRelationshipObjectsOnOptionalProperty.ts]
interface A1 {
    b?: number;
}

interface B1 {
    b?: string;
}

var a: A1;
var b: B1;

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

//// [comparisonOperatorWithNoRelationshipObjectsOnOptionalProperty.js]
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
