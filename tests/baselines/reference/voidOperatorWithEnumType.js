//// [voidOperatorWithEnumType.ts]
// void  operator on enum type

enum ENUM { };
enum ENUM1 { A, B, "" };

// enum type var
var ResultIsAny1 = void ENUM;
var ResultIsAny2 = void ENUM1;

// enum type expressions
var ResultIsAny3 = void ENUM1["A"];
var ResultIsAny4 = void (ENUM[0] + ENUM1["B"]);

// multiple void  operators
var ResultIsAny5 = void void ENUM;
var ResultIsAny6 = void void void (ENUM[0] + ENUM1.B);

// miss assignment operators
void ENUM;
void ENUM1;
void ENUM1["B"];
void ENUM, ENUM1;

//// [voidOperatorWithEnumType.js]
// void  operator on enum type
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
var ResultIsAny1 = void ENUM;
var ResultIsAny2 = void ENUM1;
// enum type expressions
var ResultIsAny3 = void ENUM1["A"];
var ResultIsAny4 = void (ENUM[0] + ENUM1["B"]);
// multiple void  operators
var ResultIsAny5 = void void ENUM;
var ResultIsAny6 = void void void (ENUM[0] + ENUM1.B);
// miss assignment operators
void ENUM;
void ENUM1;
void ENUM1["B"];
void ENUM, ENUM1;
