//// [tests/cases/conformance/expressions/unaryOperators/incrementOperator/incrementOperatorWithEnumType.ts] ////

//// [incrementOperatorWithEnumType.ts]
// ++ operator on enum type

enum ENUM1 { A, B, "" };

// expression
var ResultIsNumber1 = ++ENUM1["B"];
var ResultIsNumber2 = ENUM1.B++;

// miss assignment operator
++ENUM1["B"];

ENUM1.B++;

//// [incrementOperatorWithEnumType.js]
// ++ operator on enum type
var ENUM1;
(function (ENUM1) {
    ENUM1[ENUM1["A"] = 0] = "A";
    ENUM1[ENUM1["B"] = 1] = "B";
    ENUM1[ENUM1[""] = 2] = "";
})(ENUM1 || (ENUM1 = {}));
;
// expression
var ResultIsNumber1 = ++ENUM1["B"];
var ResultIsNumber2 = ENUM1.B++;
// miss assignment operator
++ENUM1["B"];
ENUM1.B++;
