//// [incrementOperatorWithEnumType.ts]
// ++ operator on enum type

enum ENUM1 { 1, 2, "" };

// expression
var ResultIsNumber1 = ++ENUM1[1];
var ResultIsNumber2 = ENUM1[1]++;

// miss assignment operator
++ENUM1[1];

ENUM1[1]++;

//// [incrementOperatorWithEnumType.js]
// ++ operator on enum type
var ENUM1;
(function (ENUM1) {
    ENUM1[ENUM1["1"] = 0] = "1";
    ENUM1[ENUM1["2"] = 1] = "2";
    ENUM1[ENUM1[""] = 2] = "";
})(ENUM1 || (ENUM1 = {}));
;

// expression
var ResultIsNumber1 = ++ENUM1[1];
var ResultIsNumber2 = ENUM1[1]++;

// miss assignment operator
++ENUM1[1];

ENUM1[1]++;
