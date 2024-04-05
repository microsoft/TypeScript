//// [tests/cases/conformance/expressions/binaryOperators/comparisonOperator/comparisonOperatorWithNoRelationshipObjectsOnProperty.ts] ////

//// [comparisonOperatorWithNoRelationshipObjectsOnProperty.ts]
class A1 {
    public a: number;
}

class B1 {
    public a: string;
}

class A2 {
    private a: string;
}

class B2 {
    private a: string;
}

var a1: A1;
var b1: B1;
var a2: A2;
var b2: B2;

// operator <
var r1a1 = a1 < b1;
var r1a2 = a2 < b2;

var r1b1 = b1 < a1;
var r1b2 = b2 < a2;

// operator >
var r2a1 = a1 > b1;
var r2a2 = a2 > b2;

var r2b1 = b1 > a1;
var r2b2 = b2 > a2;

// operator <=
var r3a1 = a1 <= b1;
var r3a2 = a2 <= b2;

var r3b1 = b1 <= a1;
var r3b2 = b2 <= a2;

// operator >=
var r4a1 = a1 >= b1;
var r4a2 = a2 >= b2;

var r4b1 = b1 >= a1;
var r4b2 = b2 >= a2;

// operator ==
var r5a1 = a1 == b1;
var r5a2 = a2 == b2;

var r5b1 = b1 == a1;
var r5b2 = b2 == a2;

// operator !=
var r6a1 = a1 != b1;
var r6a2 = a2 != b2;

var r6b1 = b1 != a1;
var r6b2 = b2 != a2;

// operator ===
var r7a1 = a1 === b1;
var r7a2 = a2 === b2;

var r7b1 = b1 === a1;
var r7b2 = b2 === a2;

// operator !==
var r8a1 = a1 !== b1;
var r8a2 = a2 !== b2;

var r8b1 = b1 !== a1;
var r8b2 = b2 !== a2;

//// [comparisonOperatorWithNoRelationshipObjectsOnProperty.js]
var A1 = /** @class */ (function () {
    function A1() {
    }
    return A1;
}());
var B1 = /** @class */ (function () {
    function B1() {
    }
    return B1;
}());
var A2 = /** @class */ (function () {
    function A2() {
    }
    return A2;
}());
var B2 = /** @class */ (function () {
    function B2() {
    }
    return B2;
}());
var a1;
var b1;
var a2;
var b2;
// operator <
var r1a1 = a1 < b1;
var r1a2 = a2 < b2;
var r1b1 = b1 < a1;
var r1b2 = b2 < a2;
// operator >
var r2a1 = a1 > b1;
var r2a2 = a2 > b2;
var r2b1 = b1 > a1;
var r2b2 = b2 > a2;
// operator <=
var r3a1 = a1 <= b1;
var r3a2 = a2 <= b2;
var r3b1 = b1 <= a1;
var r3b2 = b2 <= a2;
// operator >=
var r4a1 = a1 >= b1;
var r4a2 = a2 >= b2;
var r4b1 = b1 >= a1;
var r4b2 = b2 >= a2;
// operator ==
var r5a1 = a1 == b1;
var r5a2 = a2 == b2;
var r5b1 = b1 == a1;
var r5b2 = b2 == a2;
// operator !=
var r6a1 = a1 != b1;
var r6a2 = a2 != b2;
var r6b1 = b1 != a1;
var r6b2 = b2 != a2;
// operator ===
var r7a1 = a1 === b1;
var r7a2 = a2 === b2;
var r7b1 = b1 === a1;
var r7b2 = b2 === a2;
// operator !==
var r8a1 = a1 !== b1;
var r8a2 = a2 !== b2;
var r8b1 = b1 !== a1;
var r8b2 = b2 !== a2;
