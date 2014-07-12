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