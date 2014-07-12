//// [plusOperatorWithEnumType.ts]
// + operator on enum type

enum ENUM { };
enum ENUM1 { 1, 2, "" };

// enum type var
var ResultIsNumber1 = +ENUM;
var ResultIsNumber2 = +ENUM1;

// enum type expressions
var ResultIsNumber3 = +ENUM1[0];
var ResultIsNumber4 = +(ENUM[0] + ENUM1[1]);

// miss assignment operators
+ENUM;
+ENUM1;
+ENUM1[1];
+ENUM, ENUM1;

//// [plusOperatorWithEnumType.js]
// + operator on enum type
var ENUM;
(function (ENUM) {
})(ENUM || (ENUM = {}));
;
var ENUM1;
(function (ENUM1) {
    ENUM1[ENUM1["1"] = 0] = "1";
    ENUM1[ENUM1["2"] = 1] = "2";
    ENUM1[ENUM1[""] = 2] = "";
})(ENUM1 || (ENUM1 = {}));
;

// enum type var
var ResultIsNumber1 = +ENUM;
var ResultIsNumber2 = +ENUM1;

// enum type expressions
var ResultIsNumber3 = +ENUM1[0];
var ResultIsNumber4 = +(ENUM[0] + ENUM1[1]);

// miss assignment operators
+ENUM;
+ENUM1;
+ENUM1[1];
+ENUM, ENUM1;
