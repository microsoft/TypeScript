//// [decrementOperatorWithEnumTypeInvalidOperations.ts]
// -- operator on enum type

enum ENUM { };
enum ENUM1 { A, B, "" };

// enum type var
var ResultIsNumber1 = --ENUM;
var ResultIsNumber2 = --ENUM1;

var ResultIsNumber3 = ENUM--;
var ResultIsNumber4 = ENUM1--;

// enum type expressions
var ResultIsNumber5 = --(ENUM["A"] + ENUM.B);
var ResultIsNumber6 = (ENUM.A + ENUM["B"])--;

// miss assignment operator
--ENUM;
--ENUM1;

ENUM--;
ENUM1--;

//// [decrementOperatorWithEnumTypeInvalidOperations.js]
// -- operator on enum type
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
var ResultIsNumber1 = --ENUM;
var ResultIsNumber2 = --ENUM1;
var ResultIsNumber3 = ENUM--;
var ResultIsNumber4 = ENUM1--;
// enum type expressions
var ResultIsNumber5 = --(ENUM["A"] + ENUM.B);
var ResultIsNumber6 = (ENUM.A + ENUM["B"])--;
// miss assignment operator
--ENUM;
--ENUM1;
ENUM--;
ENUM1--;
