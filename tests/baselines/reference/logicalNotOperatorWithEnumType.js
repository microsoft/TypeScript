//// [logicalNotOperatorWithEnumType.ts]
// ! operator on enum type

enum ENUM { 1, 2, 3 };
enum ENUM1 { };

// enum type var
var ResultIsBoolean1 = !ENUM;

// enum type expressions
var ResultIsBoolean2 = !ENUM[1];
var ResultIsBoolean3 = !(ENUM[1] + ENUM[2]);

// multiple ! operators
var ResultIsBoolean4 = !!ENUM;
var ResultIsBoolean5 = !!!(ENUM[1] + ENUM[2]);

// miss assignment operators
!ENUM;
!ENUM1;
!ENUM[1];
!ENUM, ENUM1;

//// [logicalNotOperatorWithEnumType.js]
// ! operator on enum type
var ENUM;
(function (ENUM) {
    ENUM[ENUM["1"] = 0] = "1";
    ENUM[ENUM["2"] = 1] = "2";
    ENUM[ENUM["3"] = 2] = "3";
})(ENUM || (ENUM = {}));
;
var ENUM1;
(function (ENUM1) {
})(ENUM1 || (ENUM1 = {}));
;

// enum type var
var ResultIsBoolean1 = !ENUM;

// enum type expressions
var ResultIsBoolean2 = !ENUM[1];
var ResultIsBoolean3 = !(ENUM[1] + ENUM[2]);

// multiple ! operators
var ResultIsBoolean4 = !!ENUM;
var ResultIsBoolean5 = !!!(ENUM[1] + ENUM[2]);

// miss assignment operators
!ENUM;
!ENUM1;
!ENUM[1];
!ENUM, ENUM1;
