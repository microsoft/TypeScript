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