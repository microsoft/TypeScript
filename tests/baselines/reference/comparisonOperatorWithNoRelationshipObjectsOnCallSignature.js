//// [tests/cases/conformance/expressions/binaryOperators/comparisonOperator/comparisonOperatorWithNoRelationshipObjectsOnCallSignature.ts] ////

//// [comparisonOperatorWithNoRelationshipObjectsOnCallSignature.ts]
class Base {
    public a: string;
}

class Derived extends Base {
    public b: string;
}

class C {
    public c: string;
}

var a1: { fn(): Base };
var b1: { new (): Base };

var a2: { fn(a: number, b: string): void };
var b2: { fn(a: string): void };

var a3: { fn(a: Base, b: string): void };
var b3: { fn(a: Derived, b: Base): void };

var a4: { fn(): Base };
var b4: { fn(): C };

var a5: { fn(a?: Base): void };
var b5: { fn(a?: C): void };

var a6: { fn(...a: Base[]): void };
var b6: { fn(...a: C[]): void };

var a7: { fn<T>(t: T): T };
var b7: { fn<T>(t: T[]): T };

// operator <
var r1a1 = a1 < b1;
var r1a2 = a2 < b2;
var r1a3 = a3 < b3;
var r1a4 = a4 < b4;
var r1a5 = a5 < b5;
var r1a6 = a6 < b6;
var r1a7 = a7 < b7;

var r1b1 = b1 < a1;
var r1b2 = b2 < a2;
var r1b3 = b3 < a3;
var r1b4 = b4 < a4;
var r1b5 = b5 < a5;
var r1b6 = b6 < a6;
var r1b7 = b7 < a7;

// operator >
var r2a1 = a1 > b1;
var r2a2 = a2 > b2;
var r2a3 = a3 > b3;
var r2a4 = a4 > b4;
var r2a5 = a5 > b5;
var r2a6 = a6 > b6;
var r2a7 = a7 > b7;

var r2b1 = b1 > a1;
var r2b2 = b2 > a2;
var r2b3 = b3 > a3;
var r2b4 = b4 > a4;
var r2b5 = b5 > a5;
var r2b6 = b6 > a6;
var r2b7 = b7 > a7;

// operator <=
var r3a1 = a1 <= b1;
var r3a2 = a2 <= b2;
var r3a3 = a3 <= b3;
var r3a4 = a4 <= b4;
var r3a5 = a5 <= b5;
var r3a6 = a6 <= b6;
var r3a7 = a7 <= b7;

var r3b1 = b1 <= a1;
var r3b2 = b2 <= a2;
var r3b3 = b3 <= a3;
var r3b4 = b4 <= a4;
var r3b5 = b5 <= a5;
var r3b6 = b6 <= a6;
var r3b7 = b7 <= a7;

// operator >=
var r4a1 = a1 >= b1;
var r4a2 = a2 >= b2;
var r4a3 = a3 >= b3;
var r4a4 = a4 >= b4;
var r4a5 = a5 >= b5;
var r4a6 = a6 >= b6;
var r4a7 = a7 >= b7;

var r4b1 = b1 >= a1;
var r4b2 = b2 >= a2;
var r4b3 = b3 >= a3;
var r4b4 = b4 >= a4;
var r4b5 = b5 >= a5;
var r4b6 = b6 >= a6;
var r4b7 = b7 >= a7;

// operator ==
var r5a1 = a1 == b1;
var r5a2 = a2 == b2;
var r5a3 = a3 == b3;
var r5a4 = a4 == b4;
var r5a5 = a5 == b5;
var r5a6 = a6 == b6;
var r5a7 = a7 == b7;

var r5b1 = b1 == a1;
var r5b2 = b2 == a2;
var r5b3 = b3 == a3;
var r5b4 = b4 == a4;
var r5b5 = b5 == a5;
var r5b6 = b6 == a6;
var r5b7 = b7 == a7;

// operator !=
var r6a1 = a1 != b1;
var r6a2 = a2 != b2;
var r6a3 = a3 != b3;
var r6a4 = a4 != b4;
var r6a5 = a5 != b5;
var r6a6 = a6 != b6;
var r6a7 = a7 != b7;

var r6b1 = b1 != a1;
var r6b2 = b2 != a2;
var r6b3 = b3 != a3;
var r6b4 = b4 != a4;
var r6b5 = b5 != a5;
var r6b6 = b6 != a6;
var r6b7 = b7 != a7;

// operator ===
var r7a1 = a1 === b1;
var r7a2 = a2 === b2;
var r7a3 = a3 === b3;
var r7a4 = a4 === b4;
var r7a5 = a5 === b5;
var r7a6 = a6 === b6;
var r7a7 = a7 === b7;

var r7b1 = b1 === a1;
var r7b2 = b2 === a2;
var r7b3 = b3 === a3;
var r7b4 = b4 === a4;
var r7b5 = b5 === a5;
var r7b6 = b6 === a6;
var r7b7 = b7 === a7;

// operator !==
var r8a1 = a1 !== b1;
var r8a2 = a2 !== b2;
var r8a3 = a3 !== b3;
var r8a4 = a4 !== b4;
var r8a5 = a5 !== b5;
var r8a6 = a6 !== b6;
var r8a7 = a7 !== b7;

var r8b1 = b1 !== a1;
var r8b2 = b2 !== a2;
var r8b3 = b3 !== a3;
var r8b4 = b4 !== a4;
var r8b5 = b5 !== a5;
var r8b6 = b6 !== a6;
var r8b7 = b7 !== a7;

//// [comparisonOperatorWithNoRelationshipObjectsOnCallSignature.js]
class Base {
    a;
}
class Derived extends Base {
    b;
}
class C {
    c;
}
var a1;
var b1;
var a2;
var b2;
var a3;
var b3;
var a4;
var b4;
var a5;
var b5;
var a6;
var b6;
var a7;
var b7;
// operator <
var r1a1 = a1 < b1;
var r1a2 = a2 < b2;
var r1a3 = a3 < b3;
var r1a4 = a4 < b4;
var r1a5 = a5 < b5;
var r1a6 = a6 < b6;
var r1a7 = a7 < b7;
var r1b1 = b1 < a1;
var r1b2 = b2 < a2;
var r1b3 = b3 < a3;
var r1b4 = b4 < a4;
var r1b5 = b5 < a5;
var r1b6 = b6 < a6;
var r1b7 = b7 < a7;
// operator >
var r2a1 = a1 > b1;
var r2a2 = a2 > b2;
var r2a3 = a3 > b3;
var r2a4 = a4 > b4;
var r2a5 = a5 > b5;
var r2a6 = a6 > b6;
var r2a7 = a7 > b7;
var r2b1 = b1 > a1;
var r2b2 = b2 > a2;
var r2b3 = b3 > a3;
var r2b4 = b4 > a4;
var r2b5 = b5 > a5;
var r2b6 = b6 > a6;
var r2b7 = b7 > a7;
// operator <=
var r3a1 = a1 <= b1;
var r3a2 = a2 <= b2;
var r3a3 = a3 <= b3;
var r3a4 = a4 <= b4;
var r3a5 = a5 <= b5;
var r3a6 = a6 <= b6;
var r3a7 = a7 <= b7;
var r3b1 = b1 <= a1;
var r3b2 = b2 <= a2;
var r3b3 = b3 <= a3;
var r3b4 = b4 <= a4;
var r3b5 = b5 <= a5;
var r3b6 = b6 <= a6;
var r3b7 = b7 <= a7;
// operator >=
var r4a1 = a1 >= b1;
var r4a2 = a2 >= b2;
var r4a3 = a3 >= b3;
var r4a4 = a4 >= b4;
var r4a5 = a5 >= b5;
var r4a6 = a6 >= b6;
var r4a7 = a7 >= b7;
var r4b1 = b1 >= a1;
var r4b2 = b2 >= a2;
var r4b3 = b3 >= a3;
var r4b4 = b4 >= a4;
var r4b5 = b5 >= a5;
var r4b6 = b6 >= a6;
var r4b7 = b7 >= a7;
// operator ==
var r5a1 = a1 == b1;
var r5a2 = a2 == b2;
var r5a3 = a3 == b3;
var r5a4 = a4 == b4;
var r5a5 = a5 == b5;
var r5a6 = a6 == b6;
var r5a7 = a7 == b7;
var r5b1 = b1 == a1;
var r5b2 = b2 == a2;
var r5b3 = b3 == a3;
var r5b4 = b4 == a4;
var r5b5 = b5 == a5;
var r5b6 = b6 == a6;
var r5b7 = b7 == a7;
// operator !=
var r6a1 = a1 != b1;
var r6a2 = a2 != b2;
var r6a3 = a3 != b3;
var r6a4 = a4 != b4;
var r6a5 = a5 != b5;
var r6a6 = a6 != b6;
var r6a7 = a7 != b7;
var r6b1 = b1 != a1;
var r6b2 = b2 != a2;
var r6b3 = b3 != a3;
var r6b4 = b4 != a4;
var r6b5 = b5 != a5;
var r6b6 = b6 != a6;
var r6b7 = b7 != a7;
// operator ===
var r7a1 = a1 === b1;
var r7a2 = a2 === b2;
var r7a3 = a3 === b3;
var r7a4 = a4 === b4;
var r7a5 = a5 === b5;
var r7a6 = a6 === b6;
var r7a7 = a7 === b7;
var r7b1 = b1 === a1;
var r7b2 = b2 === a2;
var r7b3 = b3 === a3;
var r7b4 = b4 === a4;
var r7b5 = b5 === a5;
var r7b6 = b6 === a6;
var r7b7 = b7 === a7;
// operator !==
var r8a1 = a1 !== b1;
var r8a2 = a2 !== b2;
var r8a3 = a3 !== b3;
var r8a4 = a4 !== b4;
var r8a5 = a5 !== b5;
var r8a6 = a6 !== b6;
var r8a7 = a7 !== b7;
var r8b1 = b1 !== a1;
var r8b2 = b2 !== a2;
var r8b3 = b3 !== a3;
var r8b4 = b4 !== a4;
var r8b5 = b5 !== a5;
var r8b6 = b6 !== a6;
var r8b7 = b7 !== a7;
