// delete  operator on enum type

enum ENUM { };
enum ENUM1 { 1, 2, "" };

// enum type var
var ResultIsBoolean1 = delete ENUM;
var ResultIsBoolean2 = delete ENUM1;

// enum type expressions
var ResultIsBoolean3 = delete ENUM1[0];
var ResultIsBoolean4 = delete (ENUM[0] + ENUM1[1]);

// multiple delete  operators
var ResultIsBoolean5 = delete delete ENUM;
var ResultIsBoolean6 = delete delete delete (ENUM[0] + ENUM1[1]);

// miss assignment operators
delete ENUM;
delete ENUM1;
delete ENUM1[1];
delete ENUM, ENUM1;