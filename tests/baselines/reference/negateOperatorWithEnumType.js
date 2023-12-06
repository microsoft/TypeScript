//// [tests/cases/conformance/expressions/unaryOperators/negateOperator/negateOperatorWithEnumType.ts] ////

//// [negateOperatorWithEnumType.ts]
// - operator on enum type

enum ENUM { };
enum ENUM1 { A, B, "" };

// enum type var
var ResultIsNumber1 = -ENUM;

// expressions
var ResultIsNumber2 = -ENUM1["B"];
var ResultIsNumber3 = -(ENUM1.B + ENUM1[""]);

// miss assignment operators
-ENUM;
-ENUM1;
-ENUM1["B"];
-ENUM, ENUM1;

//// [negateOperatorWithEnumType.js]
// - operator on enum type
var ENUM;
(function (ENUM) {
})(ENUM || (ENUM = {}));
;
var ENUM1;
(function (ENUM1) {
    ENUM1[ENUM1["A"] = 0] = "A";
    ENUM1[ENUM1["B"] = 1] = "B";
    ENUM1[ENUM1[""] = 2] = "";
})(ENUM1 || (ENUM1 = {}));
;
// enum type var
var ResultIsNumber1 = -ENUM;
// expressions
var ResultIsNumber2 = -ENUM1["B"];
var ResultIsNumber3 = -(ENUM1.B + ENUM1[""]);
// miss assignment operators
-ENUM;
-ENUM1;
-ENUM1["B"];
-ENUM, ENUM1;
