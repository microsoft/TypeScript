//// [deleteOperatorWithEnumType.ts]
// delete  operator on enum type

enum ENUM { };
enum ENUM1 { A, B, "" };

// enum type var
var ResultIsBoolean1 = delete ENUM;
var ResultIsBoolean2 = delete ENUM1;

// enum type expressions
var ResultIsBoolean3 = delete ENUM1["A"];
var ResultIsBoolean4 = delete (ENUM[0] + ENUM1["B"]);

// multiple delete  operators
var ResultIsBoolean5 = delete delete ENUM;
var ResultIsBoolean6 = delete delete delete (ENUM[0] + ENUM1["B"]);

// miss assignment operators
delete ENUM;
delete ENUM1;
delete ENUM1.B;
delete ENUM, ENUM1;

//// [deleteOperatorWithEnumType.js]
// delete  operator on enum type
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
var ResultIsBoolean1 = delete ENUM;
var ResultIsBoolean2 = delete ENUM1;
// enum type expressions
var ResultIsBoolean3 = delete ENUM1["A"];
var ResultIsBoolean4 = delete (ENUM[0] + ENUM1["B"]);
// multiple delete  operators
var ResultIsBoolean5 = delete delete ENUM;
var ResultIsBoolean6 = delete delete delete (ENUM[0] + ENUM1["B"]);
// miss assignment operators
delete ENUM;
delete ENUM1;
delete ENUM1.B;
delete ENUM, ENUM1;
