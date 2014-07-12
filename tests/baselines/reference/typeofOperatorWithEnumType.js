//// [typeofOperatorWithEnumType.ts]
// typeof  operator on enum type

enum ENUM { };
enum ENUM1 { 1, 2, "" };

// enum type var
var ResultIsString1 = typeof ENUM;
var ResultIsString2 = typeof ENUM1;

// enum type expressions
var ResultIsString3 = typeof ENUM1[0];
var ResultIsString4 = typeof (ENUM[0] + ENUM1[1]);

// multiple typeof  operators
var ResultIsString5 = typeof typeof ENUM;
var ResultIsString6 = typeof typeof typeof (ENUM[0] + ENUM1[1]);

// miss assignment operators
typeof ENUM;
typeof ENUM1;
typeof ENUM1[1];
typeof ENUM, ENUM1;

// use typeof in type query
enum z { };
z: typeof ENUM;
z: typeof ENUM1;

//// [typeofOperatorWithEnumType.js]
// typeof  operator on enum type
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
var ResultIsString1 = typeof ENUM;
var ResultIsString2 = typeof ENUM1;

// enum type expressions
var ResultIsString3 = typeof ENUM1[0];
var ResultIsString4 = typeof (ENUM[0] + ENUM1[1]);

// multiple typeof  operators
var ResultIsString5 = typeof typeof ENUM;
var ResultIsString6 = typeof typeof typeof (ENUM[0] + ENUM1[1]);

// miss assignment operators
typeof ENUM;
typeof ENUM1;
typeof ENUM1[1];
typeof ENUM, ENUM1;

// use typeof in type query
var z;
(function (z) {
})(z || (z = {}));
;
z:
typeof ENUM;
z:
typeof ENUM1;
