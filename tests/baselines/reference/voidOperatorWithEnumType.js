//// [voidOperatorWithEnumType.ts]
// void  operator on enum type

enum ENUM { };
enum ENUM1 { 1, 2, "" };

// enum type var
var ResultIsAny1 = void ENUM;
var ResultIsAny2 = void ENUM1;

// enum type expressions
var ResultIsAny3 = void ENUM1[0];
var ResultIsAny4 = void (ENUM[0] + ENUM1[1]);

// multiple void  operators
var ResultIsAny5 = void void ENUM;
var ResultIsAny6 = void void void (ENUM[0] + ENUM1[1]);

// miss assignment operators
void ENUM;
void ENUM1;
void ENUM1[1];
void ENUM, ENUM1;

//// [voidOperatorWithEnumType.js]
// void  operator on enum type
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
var ResultIsAny1 = void ENUM;
var ResultIsAny2 = void ENUM1;

// enum type expressions
var ResultIsAny3 = void ENUM1[0];
var ResultIsAny4 = void (ENUM[0] + ENUM1[1]);

// multiple void  operators
var ResultIsAny5 = void void ENUM;
var ResultIsAny6 = void void void (ENUM[0] + ENUM1[1]);

// miss assignment operators
void ENUM;
void ENUM1;
void ENUM1[1];
void ENUM, ENUM1;
