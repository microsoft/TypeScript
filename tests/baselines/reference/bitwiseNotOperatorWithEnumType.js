//// [bitwiseNotOperatorWithEnumType.ts]
// ~ operator on enum type

enum ENUM1 { 1, 2, "" };

// enum type var
var ResultIsNumber1 = ~ENUM1;

// enum type expressions
var ResultIsNumber2 = ~ENUM1[1];
var ResultIsNumber3 = ~(ENUM1[1] + ENUM1[2]);

// multiple ~ operators
var ResultIsNumber4 = ~~~(ENUM1[1] + ENUM1[2]);

// miss assignment operators
~ENUM1;
~ENUM1[1];
~ENUM1[1], ~ENUM1[2];

//// [bitwiseNotOperatorWithEnumType.js]
// ~ operator on enum type
var ENUM1;
(function (ENUM1) {
    ENUM1[ENUM1["1"] = 0] = "1";
    ENUM1[ENUM1["2"] = 1] = "2";
    ENUM1[ENUM1[""] = 2] = "";
})(ENUM1 || (ENUM1 = {}));
;

// enum type var
var ResultIsNumber1 = ~ENUM1;

// enum type expressions
var ResultIsNumber2 = ~ENUM1[1];
var ResultIsNumber3 = ~(ENUM1[1] + ENUM1[2]);

// multiple ~ operators
var ResultIsNumber4 = ~~~(ENUM1[1] + ENUM1[2]);

// miss assignment operators
~ENUM1;
~ENUM1[1];
~ENUM1[1], ~ENUM1[2];
